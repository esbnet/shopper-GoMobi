import { useAppContext } from "@/hooks/useAppContext";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export function Navbar() {
	const navigate = useNavigate();
	const { confirmData } = useAppContext();

	const handleNewRide = () => {
		navigate("/ride");
	};
	const handleLogout = () => {
		navigate("/");
	};

	return (
		<div className="flex justify-between gap-4 p-4">
			<div className="flex flex-row flex-1 font-mono text-xs">
				<div className="flex flex-row flex-1 items-center bg-slate-800 p-2 rounded-l-md">
					<div className="flex flex-col text-slate-900">
						<span className="text-right text-slate-400">Origem :</span>
						<span className="text-right text-slate-400">Destino :</span>
					</div>
					<div className="flex flex-col">
						<span className="ml-2 text-slate-200 truncate">
							{confirmData.origin}
						</span>
						<span className="ml-2 text-slate-200">
							{confirmData.destination}
						</span>
					</div>
				</div>

				<Separator orientation="vertical" className="bg-slate-400" />

				<div className="flex bg-slate-900 p-2 rounded-r-md">
					<div className="flex flex-col text-slate-800">
						<span className="text-right text-slate-400">Duranção :</span>
						<span className="text-right text-slate-400">Distância : </span>
					</div>

					<div className="flex flex-col ml-2 text-slate-200">
						<span>{confirmData.duration}</span>
						<span>{(confirmData.distance / 1000).toFixed(2)} km </span>
					</div>
				</div>
			</div>

			<Button className="h-full" onClick={handleNewRide}>
				Nova viagem
			</Button>
			<Button className="h-full" onClick={handleLogout}>
				Sair
			</Button>
		</div>
	);
}
