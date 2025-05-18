import { http, createConfig } from "wagmi";
import { rootstock, rootstockTestnet } from "wagmi/chains";

export const config = createConfig({
    chains: [rootstockTestnet, rootstock],
    transports: {
        [rootstockTestnet.id]: http(),
        [rootstock.id]: http(),
    },
});

export const contractAddress = "0xEe3849bB6C0EB5bEb5149dd3b46d886278054CB9";
