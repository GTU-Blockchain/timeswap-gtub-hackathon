import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TimeSwapModule", (m) => {
    // First deploy the TimeToken contract
    const timeToken = m.contract("TimeToken");

    // Then deploy TimeSwap with the TimeToken address
    const timeSwap = m.contract("TimeSwap", [timeToken]);

    return { timeToken, timeSwap };
});
