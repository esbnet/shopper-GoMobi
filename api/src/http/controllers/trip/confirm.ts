import type { FastifyReply, FastifyRequest } from "fastify";

import type { RouteRequest } from "@/@types/app-types";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema de validação
const confirmRouteBodySchema = z
	.object({
		customer_id: z.string().min(1, "Id de cliente não informado"),
		origin: z.string().min(1, "Endereço de origem não informado"),
		destination: z.string().min(1, "Endereço de destino não informado"),
		distance: z.number(),
		duration: z.string(),
		driver: z
			.object({
				id: z.string(),
				name: z.string(),
			})
			.required(),
		value: z.number(),
	})
	.refine((data) => data.origin !== data.destination, {
		message: "Origem e destino devem ser diferentes",
		path: ["destination"],
	});

export async function confirmTrip(
	request: FastifyRequest<{
		Body: RouteRequest;
	}>,
	reply: FastifyReply,
) {
	const {
		customer_id,
		origin,
		destination,
		distance,
		duration,
		driver: { id: driver_id, name: driver_name },
		value,
	} = confirmRouteBodySchema.parse(request.body);

	// 1. Verificar se o motorista existe
	// 2. Verificar se o motorista tem disponibilidade
	// 3. Criar a corrida

	// 1. Verificar se o motorista existe
	const driver = await prisma.driver.findUnique({
		where: {
			id: driver_id,
		},
	});

	if (!driver) {
		return reply.status(404).send({
			error_code: "INVALID_DATA",
			error_description: "Motorista não encontrado",
		});
	}

	// 2. Verificar se o motorista tem disponibilidade
	if (driver.status !== "AVAILABLE") {
		return reply.status(400).send({
			error_code: "INVALID_DATA",
			error_description: "Motorista indisponível",
		});
	}

	// 3. Verifica se a distância para o motorisra
	if (driver.minKm > distance / 1000) {
		return reply.status(400).send({
			error_code: "INVALID_DATA",
			error_description: "Quilometragem inválida para o motorista",
		});
	}

	// 3. Criar a corrida
	try {
		const response = await prisma.race.create({
			data: {
				customerId: customer_id,
				origin,
				destination,
				distance,
				duration,
				value,
				driverId: driver_id,
			},
		});

		return reply.status(200).send("Operação realizada com sucesso");
	} catch (error) {
		if (error instanceof z.ZodError) {
			return reply.status(400).send({
				error_code: "INVALID_DATA",
				error_description: "Os dados fornecidos da requisição são inválidos",
				details: error.issues,
			});
		}
		return reply.status(500).send({ error: "Internal server error" });
	}
}
