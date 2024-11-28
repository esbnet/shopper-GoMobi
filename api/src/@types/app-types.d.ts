import type { Decimal } from "@prisma/client/runtime/library";

// Types
export interface RouteRequest {
	origin: string;
	destination: string;
}

export interface Coordinates {
	latitude: number;
	longitude: number;
}

export interface RouteOption {
	id: string;
	name: string;
	description: string;
	vehicle: string;
	review: {
		rating: number;
		comment: string;
	};
	value: number;
}

export interface EnhancedRouteResponse {
	[x: string]: number;
	origin: Coordinates;
	destination: Coordinates;
	distance: number;
	duration: string;
	options: RouteOption[];
	routeResponse: object;
}

export interface Driver {
	id: string;
	name: string;
	description: string;
	vehicle: string;
	review: {
		rating: number;
		comment: string;
	};
	value: number;
}

export interface Ride {
	id: string;
	date: Date;
	origin: string;
	destination: string;
	distance: number;
	duration: string;
	driver: {
		id: string;
		name: string;
	};
	value: Decimal;
}

export interface HistoryResponse {
	customer_id: string;
	rides: Ride[];
}

export interface ResponseData {
	origin: {
		latitude: number;
		longitude: number;
	};
	destination: {
		latitude: number;
		longitude: number;
	};
	distance: number;
	duration: string;
	options: options;
	routeResponse: route.data;
}
