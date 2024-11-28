export type Driver = {
	id: string;
	name: string;
	description: string;
	vehicle: string;
	review: {
		rating: number;
		comment: string;
	};
	value: number;
};
