import {
	APIProvider,
	AdvancedMarker,
	InfoWindow,
	Map,
	Pin,
	useMap,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

import { useAppContext } from "@/hooks/useAppContext";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;

//const GOOGLE_API_KEY = "AIzaSyC1F3TkSrUjjPCiP5w4yMOK2hlkV5k7CJI";

function MapComponent() {
	const { coordinates } = useAppContext();

	const start = coordinates?.start;
	const end = coordinates?.end;

	const [open, setOpen] = useState(false);
	const [routeInfo, setRouteInfo] = useState<{
		distance?: string;
		duration?: string;
	}>({});
	const map = useMap();

	useEffect(() => {
		if (!map) return;

		// Criar a linha da rota
		const polyline = new google.maps.Polyline({
			path: [],
			geodesic: true,
			strokeColor: "#2563EB",
			strokeOpacity: 1.0,
			strokeWeight: 4,
			map: map,
		});

		// Criar serviço de direção
		const directionsService = new google.maps.DirectionsService();

		// Configurar solicitação de rota
		const request: google.maps.DirectionsRequest = {
			origin: new google.maps.LatLng(start.lat, start.lng),
			destination: new google.maps.LatLng(end.lat, end.lng),
			travelMode: google.maps.TravelMode.DRIVING,
		};

		directionsService.route(request, (result, status) => {
			if (status === "OK" && result) {
				const path = result.routes[0].overview_path;
				polyline.setPath(path);

				// Ajustar os bounds para incluir toda a rota
				const bounds = new google.maps.LatLngBounds();

				// Adicionar todos os pontos da rota aos bounds
				// biome-ignore lint/complexity/noForEach: <explanation>
				path.forEach((point) => bounds.extend(point));

				// Centralizar o mapa na rota
				map.fitBounds(bounds);

				// Obter distância e duração
				const route = result.routes[0].legs[0];
				setRouteInfo({
					distance: route.distance?.text,
					duration: route.duration?.text,
				});
			} else {
				// Centralizar nos marcadores se a rota falhar
				const bounds = new google.maps.LatLngBounds();
				bounds.extend(new google.maps.LatLng(start.lat, start.lng));
				bounds.extend(new google.maps.LatLng(end.lat, end.lng));
				map.fitBounds(bounds);
			}
		});

		return () => {
			polyline.setMap(null); // Limpar a rota ao desmontar
		};
	}, [map, start, end]);

	return (
		<>
			{/* Marcador de início */}
			<AdvancedMarker position={start} onClick={() => setOpen(true)}>
				<Pin
					background={"green"}
					borderColor={"darkgreen"}
					glyphColor={"white"}
				/>
			</AdvancedMarker>

			{/* Marcador de destino */}
			<AdvancedMarker position={end}>
				<Pin background={"red"} borderColor={"darkred"} glyphColor={"white"} />
			</AdvancedMarker>

			{/* Janela de informações */}
			{open && (
				<InfoWindow position={start} onCloseClick={() => setOpen(false)}>
					<div>
						<h1>Go Mobi</h1>
						{routeInfo.duration && <p>Tempo estimado: {routeInfo.duration}</p>}
						{routeInfo.distance && <p>Distância: {routeInfo.distance}</p>}
					</div>
				</InfoWindow>
			)}
		</>
	);
}

export default function GoMobiMap() {
	const {
		coordinates: { start, end },
	} = useAppContext();

	// Validar parâmetros antes de renderizar
	if (!start || !end) {
		return <p>Parâmetros inválidos. Não foi possível carregar o mapa.</p>;
	}

	return (
		<div className="shadow-md rounded-lg w-[400%] overflow-hidden">
			<APIProvider apiKey={GOOGLE_API_KEY}>
				<div className="m-auto w-full h-[40vh]">
					<Map
						mapId={"6da00dbe931348c"}
						gestureHandling="greedy"
						disableDefaultUI={false}
						streetViewControl={false}
						mapTypeControl={false}
						fullscreenControl={false}
						zoomControl={true}
						draggable={true}
						scrollwheel={true}
						keyboardShortcuts={true}
					>
						<MapComponent />
					</Map>
				</div>
			</APIProvider>
		</div>
	);
}
