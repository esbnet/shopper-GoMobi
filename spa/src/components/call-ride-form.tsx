import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { useAppContext } from "@/hooks/useAppContext";
import { callEstimateApi } from "@/services/call-estimate-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "./ui/input";

const formSchema = z.object({
	customer_id: z.string().min(6, {
		message: "É necessário informar o ID do cliente.",
	}),
	origin: z.string().min(2, {
		message: "É necessário informar o ponto de partida.",
	}),
	destination: z.string().min(2, {
		message: "É necessário informar o ponto de chegada.",
	}),
});

export default function FormCallRide() {
	const [isLoading, setIsLoading] = useState(false);

	const { setCoordinates, setConfirmData, setDrivers } = useAppContext();

	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			customer_id: "",
			origin: "",
			destination: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const data = {
			customer_id: values.customer_id,
			origin: values.origin,
			destination: values.destination,
		};

		try {
			setIsLoading(true);

			// Busca as informações de geolocalização da origem e destino e dados do motorista
			const response = await callEstimateApi(data);

			// Verificar se a resposta é válida
			if (!response) {
				throw new Error("Erro ao chamar a API");
			}

			const drivers = response.options;
			setDrivers(drivers);

			// Formatar start e end para o formato esperado
			const start = {
				lat: response.origin.latitude,
				lng: response.origin.longitude,
			};
			const end = {
				lat: response.destination.latitude,
				lng: response.destination.longitude,
			};

			setCoordinates({
				start,
				end,
			});

			const distance = response.distance as number;
			const duration = response.duration as string;

			const confirmData = {
				customer_id: values.customer_id,
				origin: values.origin,
				destination: values.destination,
				distance,
				duration,
			};

			setConfirmData(confirmData);

			navigate("../confirm");
		} catch (error) {
			console.log(error);
			toast.error("Ocorreu um erro ao tentar estimar a viagem.", {
				description: "Revise os endereços informados e tente novamente.",
			});
		} finally {
			// Desativar estado de carregamento
			setIsLoading(false);
		}
	}

	const handleLogout = () => {
		navigate("/");
	};

	return (
		<div className="bg-slate-400/30 shadow-xl px-2 py-4 sm:p-6 rounded-lg w-full">
			<h1 className="flex m-auto mb-8 font-bold text-2xl">Inicie sua viagem</h1>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="customer_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Código do cliente</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Informe o código para identificação do cliente
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="origin"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Partida</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Informe o local de origem (rua ou av, número, bairro, cidade,
									estado)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="destination"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Chegada</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormDescription>
									Informe o local de destino (rua ou av, número, bairro, cidade,
									estado)
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-between gap-4">
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Carregando..." : "Estimar valor da viagem"}
						</Button>
						<Button disabled={isLoading} onClick={handleLogout}>
							{isLoading ? "Carregando..." : "Sair"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
