export type RideProps = {
	id: number;
	date: Date;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	driver: {
		id: number;
		name: string;
	};
	value: number;
};

export type ReportProps = {
	customer_id: string;
	id: number;
	date: Date;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	driver: {
		id: number;
		name: string;
	};
	value: number;
};

export type ReportData = {
	customer_id: string;
	rides: RideProps[];
};
