import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../components/ui/form";

import { callReportApi } from "@/services/call-report-api";
import type { RideProps } from "@/types/ride-type";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const formSchema = z.object({
	customer_id: z.string().min(6, {
		message: "É necessário informar o ID do cliente.",
	}),
	driver_id: z.string().optional(),
});

export default function ReportForm() {
	const [rides, setRides] = useState<RideProps[]>([]);

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const { customer_id } = useParams() as { customer_id: string };
	const driver_id = searchParams.get("driver_id") as string;

	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			customer_id: customer_id || "",
			driver_id: driver_id || "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			navigate(
				`/report/${values.customer_id}?driver_id=${values.driver_id || ""}`,
			);
		} catch (error) {
			console.log(error);
			toast.error("Erro ao carregar o relatório.");
		}
	}

	const handleLogout = () => {
		navigate("/");
	};

	useEffect(() => {
		async function getRides() {
			try {
				setIsLoading(true);

				// Chama a API para buscar os dados
				const response = await callReportApi({
					customer_id: customer_id || "",
					driver_id: driver_id || "",
				});
				setRides(response);
			} catch (error) {
				console.log(error);
				toast.error("Erro ao carregar o relatório.");
			} finally {
				setIsLoading(false);
			}
		}

		// Só chama a API se houver um `customer_id`
		if (customer_id) {
			getRides();
		}
	}, [customer_id, driver_id]); // Atualiza sempre que `customer_id` ou `driver_id` mudarem

	return (
		<section>
			<div className="flex flex-row gap-4">
				<div className="flex flex-col gap-2 w-[70%]">
					<h1 className="p-4 text-2xl">Código do cliente :{"  "}</h1>
					<span className="px-4 font-mono text-4xl italic">{customer_id}</span>
				</div>
				<div className="flex flex-col gap-4 bg-slate-400/30 p-8 rounded-md w-[30%]">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
								name="driver_id"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Código do motorista</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormDescription>
											Informe o código do motorista
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col justify-between gap-4 w-full">
								<Button type="submit" disabled={isLoading}>
									{isLoading ? "Carregando..." : "Atualizar relatório"}
								</Button>
							</div>
						</form>
					</Form>
					<Button onClick={() => handleLogout()}>Sair</Button>
				</div>
			</div>

			<h1 className="flex flex-1 justify-center items-center mb-8 p-4 font-extrabold text-4xl">
				Histórico de Viagens
			</h1>

			<div className="border rounded-md font-mono">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead colSpan={7} className="px-4 py-2 text-center">
								{rides.length} VIAGENS REALIZADAS
							</TableHead>
						</TableRow>

						<TableRow>
							<TableHead className="px-4 py-2">DATA</TableHead>
							<TableHead className="px-4 py-2">MOTORISTA</TableHead>
							<TableHead className="px-4 py-2">ORIGEM</TableHead>
							<TableHead className="px-4 py-2">DESTINO</TableHead>
							<TableHead className="px-4 py-2">DISTÂNCIA</TableHead>
							<TableHead className="px-4 py-2">TEMPO</TableHead>
							<TableHead className="px-4 py-2">VALOR</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rides.map((rider) => (
							<TableRow key={uuidv4()}>
								<TableCell className="px-4 py-2">
									{format(new Date(rider.date), "dd/MM/yyyy HH:mm", {
										locale: ptBR,
									})}
								</TableCell>
								<TableCell className="px-4 py-2">{rider.driver.name}</TableCell>
								<TableCell className="px-4 py-2">{rider.origin}</TableCell>
								<TableCell className="px-4 py-2">{rider.destination}</TableCell>
								<TableCell className="px-4 py-2">
									{rider.distance / 1000} km
								</TableCell>
								<TableCell className="px-4 py-2">{rider.duration}</TableCell>
								<TableCell className="px-4 py-2">{rider.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</section>
	);
}
