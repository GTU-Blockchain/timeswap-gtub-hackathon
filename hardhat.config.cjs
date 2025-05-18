require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.28",
    networks: {
        rootstockTestnet: {
            url: "https://public-node.testnet.rsk.co",
            chainId: 31,
            accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
            gasPrice: 60000000, // 0.06 gwei
        },
    },
    etherscan: {
        apiKey: {
            rootstockTestnet: "not-needed", // Rootstock doesn't need an API key
        },
        customChains: [
            {
                network: "rootstockTestnet",
                chainId: 31,
                urls: {
                    apiURL: "https://explorer.testnet.rsk.co/api",
                    browserURL: "https://explorer.testnet.rsk.co",
                },
            },
        ],
    },
};
