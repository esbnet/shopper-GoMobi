import cookie from "@fastify/cookie";
import cors from "@fastify/cors";
import fastify from "fastify";
import { env } from "node:process";
import { ZodError } from "zod";
import { tripsRoutes } from "./http/controllers/trip/routes";

export const app = fastify();

app.register(cors, {
	origin: true,
	credentials: true,
});

app.register(cookie);
app.register(tripsRoutes);

app.setErrorHandler((error, _, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation error.: ", issue: error.format() });
	}

	if (env.NODE_ENV !== "prod") {
		console.error(error);
	} else {
		// TODO: log error on external tools (datadog, sentry, etc)
	}

	return reply.status(500).send({ message: "Internal server error." });
});
