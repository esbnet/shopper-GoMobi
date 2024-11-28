// const API_URL = import.meta.env.VITE_API_URL as string;

type RideProps = {
	customer_id: string;
	origin: string;
	destination: string;
};

export async function callEstimateApi({
	customer_id,
	origin,
	destination,
}: RideProps) {
	const url = "http://localhost:8080/ride/estimate";
	const options = {
		method: "POST",
		headers: {
			accept: "application/json",
			"Content-Type": "application/json;charset=UTF-8",
		},
		body: JSON.stringify({ customer_id, origin, destination }),
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
