import type React from "react";
import { type ReactNode, createContext, useState } from "react";

import type { ConfirmData } from "@/types/confirm-data-type";
import type { Coordinate } from "@/types/coordinate";
import type { Driver } from "@/types/driver-type";
import type { ReportProps } from "@/types/ride-type";

// Defina o tipo do contexto
interface AppContextType {
	report: ReportProps;
	coordinates: Coordinate;
	driver: Driver;
	drivers: Driver[];
	confirmData: ConfirmData;
	setDriver: (driver: Driver) => void;
	setDrivers: (drivers: Driver[]) => void;
	setCoordinates: (coordinates: Coordinate) => void;
	setConfirmData: (confirmData: ConfirmData) => void;
	setReport: (report: ReportProps) => void;
}

// Crie o contexto
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Componente provedor
export const AppProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [driver, setDriver] = useState<Driver>({} as Driver);
	const [drivers, setDrivers] = useState<Driver[]>([]);
	const [coordinates, setCoordinates] = useState<Coordinate>({} as Coordinate);
	const [confirmData, setConfirmData] = useState<ConfirmData>(
		{} as ConfirmData,
	);
	const [report, setReport] = useState<ReportProps>({} as ReportProps);

	return (
		<AppContext.Provider
			value={{
				setDriver,
				setDrivers,
				setConfirmData,
				setCoordinates,
				driver,
				confirmData,
				coordinates,
				drivers,
				report,
				setReport,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

// Hook para usar o contexto
// export const useAppContext = () => {
// 	const context = useContext(AppContext);
// 	if (!context) {
// 		throw new Error("useAppContext deve ser usado dentro de um AppProvider");
// 	}
// 	return context;
// };
