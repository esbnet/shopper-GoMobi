import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Home() {
	const navigate = useNavigate();
	return (
		<section>
			<div className="flex flex-col h-screen">
				<div className="flex flex-col flex-1 items-center p-44">
					<h1 className="mb-8 font-extrabold text-4xl">Bem vindo!</h1>
					<h1 className="mb-14 font-thin text-2xl text-slate-600">
						Ficamos felizes em ter voce aqui
					</h1>
					{/* <div className="mb-12">
						<Logo />
					</div> */}

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Button
									title=""
									onClick={() => navigate("/ride")}
									className="p-6 w-56 font-audiowide font-bold text-xl"
								>
									Go
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Sua viagem começa aqui</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</section>
	);
}
