import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import {
    darkTheme,
    lightTheme,
    getDefaultConfig,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { rootstock, rootstockTestnet } from "wagmi/chains";

const queryClient = new QueryClient();
const rainbowConfig = getDefaultConfig({
    appName: "timeswap",
    projectId: "c73b126570d8a919fedee590ebc4d109",
    chains: [rootstockTestnet, rootstock],
});

createRoot(document.getElementById("root")).render(
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
                theme={{
                    darkMode: darkTheme({
                        accentColor: "var(--color-primary)",
                        accentColorForeground: "white",
                        fontStack: "system",
                        overlayBlur: "small",
                    }),
                    lightMode: lightTheme({
                        accentColor: "var(--color-primary)",
                        accentColorForeground: "white",
                        fontStack: "system",
                        overlayBlur: "small",
                    }),
                }}
            >
                <StrictMode>
                    <App />
                </StrictMode>
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
);
