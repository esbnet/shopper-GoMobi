import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../ui/table";

import { useAppContext } from "@/hooks/useAppContext";
import { callConfirmApi } from "@/services/call-confirm-api";
import type { ConfirmRequest } from "@/types/confirm-request-type";
import type { Driver } from "@/types/driver-type";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function DataTable() {
	const [isLoading, setIsLoading] = useState(false);
	const { confirmData, drivers } = useAppContext();
	const navigate = useNavigate();

	async function handleConfirm(driver_id: string) {
		const selectedDriver = drivers.find(
			(item) => item.id === driver_id,
		) as Driver;

		const dataResquest = {
			customer_id: confirmData.customer_id,
			origin: confirmData.origin,
			destination: confirmData.destination,
			distance: confirmData.distance,
			duration: confirmData.duration,
			driver: {
				id: selectedDriver.id.toString(),
				name: selectedDriver?.name,
			},
			value: selectedDriver.value,
		} as ConfirmRequest;

		try {
			setIsLoading(true);
			// Enviar a solicitação de confirmação
			await callConfirmApi(dataResquest);
			toast.success("Seu motorista já está a caminho!");
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
			navigate(`/report/${confirmData.customer_id}?driver_id=${driver_id}`, {
				replace: true,
			});
		}
	}

	return (
		<div className="border rounded-md font-mono">
			{isLoading ? (
				<div className="flex flex-col justify-center items-center">
					<h2 className="font-semibold text-center text-gray-900 text-xl">
						Processando...
					</h2>
				</div>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead colSpan={7} className="px-4 py-2 text-center">
								{drivers.length} MOTORISTAS DISPONÍVEIS
							</TableHead>
						</TableRow>
						<TableRow>
							<TableHead className="px-4 py-2">NOME</TableHead>
							<TableHead className="px-4 py-2">DESCRIÇÃO</TableHead>
							<TableHead className="px-4 py-2">CARRO</TableHead>
							<TableHead colSpan={2} className="px-4 py-2">
								AVALIAÇÃO
							</TableHead>
							<TableHead className="px-4 py-2">VALOR</TableHead>
							<TableHead className="px-4 py-2">CONFIRMAR</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{drivers.map((item) => {
							const review = `${item.review.rating} - ${item.review.comment}`;
							return (
								<TableRow key={item.id}>
									<TableCell className="px-4 py-2 border">
										{item.name}
									</TableCell>
									<TableCell className="px-4 py-2 border">
										{item.description}
									</TableCell>
									<TableCell className="px-4 py-2 border">
										{item.vehicle}
									</TableCell>
									<TableCell colSpan={2} className="px-4 py-2 border">
										{review}
									</TableCell>
									<TableCell className="px-4 py-2 border">{`R$${item.value.toFixed(2)}`}</TableCell>
									<TableCell className="px-4 py-2 border">
										<Button
											className="border-green-700 hover:border-green-500 bg-green-500 hover:bg-green-400 px-4 py-2 border-b-4 rounded font-bold text-white"
											onClick={() => handleConfirm(item.id)}
										>
											Escolher
										</Button>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			)}
		</div>
	);
}
