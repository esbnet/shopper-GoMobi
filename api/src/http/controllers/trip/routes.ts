import type { FastifyInstance } from "fastify";
import { confirmTrip } from "./confirm";
import { estimateTrip } from "./estimate-trip";
import { history } from "./history";

export async function tripsRoutes(app: FastifyInstance) {
	app.post("/ride/estimate", estimateTrip);
	app.patch("/ride/confirm", confirmTrip);
	app.get("/ride/:customer_id", history);
}
