import { http, createConfig } from "wagmi";
import { rootstock, rootstockTestnet } from "wagmi/chains";

export const config = createConfig({
    chains: [rootstock, rootstockTestnet],
    transports: {
        [rootstock.id]: http(),
        [rootstockTestnet.id]: http(),
    },
});
