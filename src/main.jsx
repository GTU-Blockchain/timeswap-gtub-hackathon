import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { WagmiProvider } from "wagmi";
import { config } from "./config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { rootstock, rootstockTestnet } from "wagmi/chains";

const queryClient = new QueryClient();
const rainbowConfig = getDefaultConfig({
    appName: "timeswap",
    projectId: "c73b126570d8a919fedee590ebc4d109",
    chains: [rootstock, rootstockTestnet],
});

createRoot(document.getElementById("root")).render(
    <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
                <StrictMode>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<App />} />
                            <Route path="/app" element={<></>} />
                        </Routes>
                    </BrowserRouter>
                </StrictMode>
            </RainbowKitProvider>
        </QueryClientProvider>
    </WagmiProvider>
);
