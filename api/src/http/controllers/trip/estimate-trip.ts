import type {
	ResponseData,
	RouteOption,
	RouteRequest,
} from "@/@types/app-types";
import {
	Client,
	Language,
	UnitSystem,
} from "@googlemaps/google-maps-services-js";
import type { FastifyReply, FastifyRequest } from "fastify";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema de validação
const calculateRouteBodySchema = z.object({
	origin: z.string().min(1, "Endereço de origem não informado"),
	destination: z.string().min(1, "Endereço de destino não informado"),
});

// Configuração do cliente Google Maps
const googleMapsClient = new Client({});

// Funções auxiliares
export function calculateTripValue(
	distanceInMeters: number,
	durationInSeconds: number,
): number {
	const BASE_FARE = 5.0;
	const PRICE_PER_KM = 2.0;
	const PRICE_PER_MINUTE = 0.5;

	const distanceValue = (distanceInMeters / 1000) * PRICE_PER_KM;
	const durationValue = (durationInSeconds / 60) * PRICE_PER_MINUTE;

	return Number((BASE_FARE + distanceValue + durationValue).toFixed(2));
}

function formatDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);

	if (hours > 0) {
		return `${hours}h ${minutes}min`;
	}
	return `${minutes} min`;
}

async function generateRouteOptions(
	distance: number,
	duration: number,
): Promise<RouteOption[]> {
	const baseValue = calculateTripValue(distance, duration);

	// pergar motorista do banco de dados
	try {
		const drivers = await prisma.driver.findMany({
			where: {
				minKm: {
					lte: distance / 1000,
				},
			},
			orderBy: {
				tax: "asc",
			},
		});

		const options: RouteOption[] = drivers.map((driver) => ({
			id: driver.id,
			name: driver.name,
			description: driver.description,
			vehicle: driver.vehicle,
			review: {
				rating: driver.rating,
				comment: driver.comment,
			},
			value: Number(driver.tax) * (distance / 1000),
		}));

		return options;
	} catch (error) {
		throw new Error("Erro ao buscar motoristas");
	}
}

// Controller
export async function estimateTrip(
	request: FastifyRequest<{
		Body: RouteRequest;
	}>,
	reply: FastifyReply,
) {
	try {
		const { origin, destination } = calculateRouteBodySchema.parse(
			request.body,
		);

		// 1. Geocodificação da origem
		const originGeocode = await googleMapsClient.geocode({
			params: {
				address: origin,
				key: process.env.GOOGLE_API_KEY as string,
				language: "pt-BR",
				region: "BR",
			},
		});

		if (!originGeocode.data.results[0]) {
			return reply.status(400).send({
				error_code: "INVALID_DATA",
				error_description: "Endereço de origem não encontrado",
			});
		}

		// 2. Geocodificação do destino
		const destinationGeocode = await googleMapsClient.geocode({
			params: {
				address: destination,
				key: process.env.GOOGLE_API_KEY as string,
				language: "pt-BR",
				region: "BR",
			},
		});

		if (!destinationGeocode.data.results[0]) {
			return reply.status(400).send({
				error_code: "INVALID_DATA",
				error_description: "Endereço de destino nao encontrado",
			});
		}

		// 3. Cálculo da rota
		const route = await googleMapsClient.directions({
			params: {
				origin: originGeocode.data.results[0].geometry.location,
				destination: destinationGeocode.data.results[0].geometry.location,
				key: process.env.GOOGLE_API_KEY as string,
				language: Language.pt_BR,
				region: "BR",
				units: UnitSystem.metric,
			},
		});

		if (!route.data.routes[0]?.legs[0]) {
			return reply.status(400).send({
				error_code: "INVALID_DATA",
				error_description: "Rota não encontrada",
			});
		}

		const leg = route.data.routes[0].legs[0];

		// 4. Gerar opções de rota
		const options = await generateRouteOptions(
			leg.distance.value,
			leg.duration.value,
		);

		// 5. Montar resposta no novo formato
		const response: ResponseData = {
			origin: {
				latitude: originGeocode.data.results[0].geometry.location.lat as number,
				longitude: originGeocode.data.results[0].geometry.location
					.lng as number,
			},
			destination: {
				latitude: destinationGeocode.data.results[0].geometry.location
					.lat as number,
				longitude: destinationGeocode.data.results[0].geometry.location
					.lng as number,
			},
			distance: leg.distance.value,
			duration: formatDuration(leg.duration.value),
			options: options,
			routeResponse: route.data,
		};

		return reply.status(200).send(response);
	} catch (error) {
		if (error instanceof z.ZodError) {
			return reply.status(400).send({
				error_code: "INVALID_DATA",
				error_description: "Erro de validação",
				details: error.issues,
			});
		}
		console.error("Erro no cálculo da rota:", error);
		return reply.status(500).send({ error: "Internal server error" });
	}
}
