import { AppContext } from "@/context/app-context";
import { useContext } from "react";

// Hook para usar o contexto
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error("useAppContext deve ser usado dentro de um AppProvider");
	}
	return context;
};
