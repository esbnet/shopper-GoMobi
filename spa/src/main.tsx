import "./global.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import { AppProvider } from "./context/app-context.tsx";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</StrictMode>,
);
