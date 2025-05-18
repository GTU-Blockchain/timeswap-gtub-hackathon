import { http, createConfig } from "wagmi";
import { rootstock, rootstockTestnet } from "wagmi/chains";

export const config = createConfig({
    chains: [rootstockTestnet, rootstock],
    transports: {
        [rootstockTestnet.id]: http(),
        [rootstock.id]: http(),
    },
});
