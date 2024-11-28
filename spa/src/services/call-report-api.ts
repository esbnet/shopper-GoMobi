import type { ReportData, RideProps } from "@/types/ride-type";

// const API_URL = import.meta.env.VITE_API_URL as string;

// Tipo para os parâmetros da função
type ReportProps = {
	customer_id: string;
	driver_id: string;
};

export async function callReportApi({
	customer_id,
	driver_id,
}: ReportProps): Promise<RideProps[]> {
	const url = `http://localhost:8080/ride/${customer_id}?driver_id=${driver_id}`;
	const options = {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json;charset=UTF-8",
		},
	};

	try {
		const response = await fetch(url, options);
		const data = (await response.json()) as ReportData;
		const { rides } = data;
		return rides;
	} catch (error) {
		console.log(error);
		throw (error as Error).message;
	}
}
