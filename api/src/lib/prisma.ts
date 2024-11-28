import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({});

prisma.$use(async (params, next) => {
	try {
		await prisma.$connect(); // Conecta ao banco
		return await next(params); // Executa a consulta
	} catch (error) {
		console.error("Erro ao conectar ao banco:", error);
		throw (error as Error).message;
	}
});
