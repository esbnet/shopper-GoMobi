import type { ConfirmRequest } from "@/types/confirm-request-type";

// const API_URL = import.meta.env.VITE_API_URL as string;

export async function callConfirmApi({
	customer_id,
	origin,
	destination,
	distance,
	duration,
	driver,
	value,
}: ConfirmRequest) {
	const url = "http://localhost:8080/ride/confirm";
	const options = {
		method: "PATCH",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json;charset=UTF-8",
		},
		body: JSON.stringify({
			customer_id,
			origin,
			destination,
			distance,
			duration,
			driver,
			value,
		}),
	};

	try {
		const response = await fetch(url, options).then((response) =>
			response.json().then((data) => data),
		);
		return response;
	} catch (error) {
		throw (error as Error).message;
	}
}
