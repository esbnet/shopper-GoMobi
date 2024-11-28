import { env } from "node:process";
import { app } from "./app";

const PORT = 8080;

app.listen({ port: PORT, host: "0.0.0.0" }).then(() => {
	console.log(`Server running on port ${env.PORT} 🚀`);
});
