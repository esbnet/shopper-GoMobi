import type { FastifyReply, FastifyRequest } from "fastify";

import type { Ride } from "@/@types/app-types";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Schema de validação
const historyRouteScheme = z.object({
	customer_id: z.string().min(1, "Id de cliente não informado"),
});

// Controller
export async function history(
	request: FastifyRequest<{
		Params: {
			customer_id: string;
		};
		Querystring: {
			driver_id?: string;
		};
	}>,
	reply: FastifyReply,
) {
	try {
		const { customer_id } = historyRouteScheme.parse(request.params);
		const { driver_id } = request.query as { driver_id?: string };

		// 1. O código do usuário informado não pode ser vazio
		if (!customer_id) {
			return reply.status(400).send({
				error_code: "INVALID_DATA",
				error_description: "Os dados fornecidos da requisição são inválidos",
			});
		}

		// . Verificar se o id do motorista existe
		// if (driver_id) {
		// 	try {
		// 		const driver = await prisma.driver.findUnique({
		// 			where: {
		// 				id: driver_id,
		// 			},
		// 		});
		// 		if (!driver) {
		// 			return reply.status(400).send({
		// 				error_code: "INVALID_DRIVER",
		// 				error_description: "Motorista invalido",
		// 			});
		// 		}
		// 	} catch (error) {
		// 		return reply.status(500).send({
		// 			error_code: "DATABASE_NOT_FOUND",
		// 			error_description: "Erro de banco de dados",
		// 		});
		// 	}
		// }

		// 3. Buscar as corridas do cliente. Se existir morotorista, buscar as corridas dele
		const rides = await prisma.race.findMany({
			where: {
				customerId: customer_id,
				...(driver_id && { driverId: driver_id }),
			},

			include: {
				Driver: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		if (rides.length === 0) {
			return reply.status(404).send({
				error_code: "NO_RIDES_FOUND",
				error_description: "Nenhuma registro encontrado",
			});
		}

		const response: Ride[] = rides.map((ride) => {
			return {
				id: ride.id,
				date: ride.createdAt,
				origin: ride.origin,
				destination: ride.destination,
				distance: ride.distance,
				duration: ride.duration,
				driver: {
					id: ride.Driver.id,
					name: ride.Driver.name,
				},
				value: ride.value,
			};
		});

		const responseRides = {
			customer_id: customer_id,
			rides: response,
		};

		return reply.send(responseRides);
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
