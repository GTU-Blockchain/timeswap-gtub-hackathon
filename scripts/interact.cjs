const hre = require("hardhat");

async function main() {
    // Validate private key
    if (!process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY) {
        throw new Error(
            "Please set ROOTSTOCK_TESTNET_PRIVATE_KEY in your .env file"
        );
    }

    const privateKey = process.env.ROOTSTOCK_TESTNET_PRIVATE_KEY.trim();
    if (!/^[0-9a-fA-F]{64}$/.test(privateKey)) {
        throw new Error(
            "Invalid private key format. It should be a 64-character hexadecimal string without '0x' prefix"
        );
    }

    // Get the deployer's signer
    const provider = new hre.ethers.JsonRpcProvider(
        "https://public-node.testnet.rsk.co"
    );
    const wallet = new hre.ethers.Wallet(`0x${privateKey}`, provider);
    console.log("Deploying contracts with account:", wallet.address);

    // Get the contract factories with the signer
    const TimeToken = await hre.ethers.getContractFactory("TimeToken", wallet);
    const TimeSwap = await hre.ethers.getContractFactory("TimeSwap", wallet);

    console.log("Deploying TimeToken...");
    const timeToken = await TimeToken.deploy();
    await timeToken.waitForDeployment();
    const timeTokenAddress = await timeToken.getAddress();
    console.log("TimeToken deployed to:", timeTokenAddress);

    console.log("Deploying TimeSwap...");
    const timeSwap = await TimeSwap.deploy(timeTokenAddress);
    await timeSwap.waitForDeployment();
    const timeSwapAddress = await timeSwap.getAddress();
    console.log("TimeSwap deployed to:", timeSwapAddress);

    // Verify contracts on Rootstock explorer
    console.log("Waiting for block confirmations...");
    await timeToken.deploymentTransaction().wait(5); // Wait 5 blocks
    await timeSwap.deploymentTransaction().wait(5);

    console.log("Verifying TimeToken contract...");
    try {
        await hre.run("verify:verify", {
            address: timeTokenAddress,
            constructorArguments: [],
        });
    } catch (error) {
        console.log("TimeToken verification failed:", error.message);
    }

    console.log("Verifying TimeSwap contract...");
    try {
        await hre.run("verify:verify", {
            address: timeSwapAddress,
            constructorArguments: [timeTokenAddress],
        });
    } catch (error) {
        console.log("TimeSwap verification failed:", error.message);
    }

    console.log("Deployment and verification completed!");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Error:", error.message);
        process.exit(1);
    });
