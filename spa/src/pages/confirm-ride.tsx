import DriverTable from "../components/driver-table/page";
import GoMobiMap from "../components/map";
import { Navbar } from "../components/navbar";

export default function ConfirmRide() {
	// Se os dados estão corretos, renderizar o mapa
	return (
		<div className="flex flex-col justify-center items-center w-full h-screen">
			<div className="flex gap-4 bg-orange-200 p-4 w-full">
				{/* <Logo /> */}
				<GoMobiMap />
			</div>
			<div className="flex flex-col flex-1 gap-4 bg-orange-200 w-full">
				<Navbar />
				<DriverTable />
			</div>
		</div>
	);
}
