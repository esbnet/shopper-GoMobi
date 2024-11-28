import { BrowserRouter, Route, Routes } from "react-router";
import {
	default as CallRide,
	default as FormCallRide,
} from "./pages/call-ride";
import {
	default as AppMap,
	default as ConfirmRide,
} from "./pages/confirm-ride";

import { default as AppLayout } from "./app-layout";
import { Toaster } from "./components/ui/sonner";
import Home from "./pages/home";
import { NotFound } from "./pages/not-found";
import ReportForm from "./pages/report-form";

export default function App() {
	return (
		<div className="bg-orange-200 m-auto w-[1280px] antialiased">
			<Toaster position="top-right" richColors expand={true} />
			<BrowserRouter>
				<Routes>
					<Route element={<AppLayout />}>
						<Route path="/" element={<Home />} />
						<Route path="/ride" element={<CallRide />} />
						<Route path="/call-ride" element={<FormCallRide />} />
						<Route path="/confirm" element={<ConfirmRide />} />
						<Route path="/map" element={<AppMap />} />
						<Route path="/report/:customer_id" element={<ReportForm />} />
					</Route>
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
