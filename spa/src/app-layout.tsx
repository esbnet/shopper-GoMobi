import { Outlet } from "react-router";
import Header from "./components/header";

export default function AppLayout() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<Outlet />
		</div>
	);
}
