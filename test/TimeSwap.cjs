const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TimeSwap System", function () {
    let TimeToken;
    let TimeSwap;
    let timeToken;
    let timeSwap;
    let owner;
    let provider;
    let buyer;
    let addrs;

    const INITIAL_TOKENS = 24n; // Initial tokens minted to deployer
    const BUYER_TOKENS = 10n; // Tokens transferred to buyer
    const SERVICE_TITLE = "Web Development";
    const SERVICE_DESCRIPTION = "Full-stack development services";
    const DECIMALS = 10n ** 18n;

    beforeEach(async function () {
        // Get signers
        [owner, provider, buyer, ...addrs] = await ethers.getSigners();

        // Deploy TimeToken
        TimeToken = await ethers.getContractFactory("TimeToken");
        timeToken = await TimeToken.deploy();

        // Deploy TimeSwap
        TimeSwap = await ethers.getContractFactory("TimeSwap");
        timeSwap = await TimeSwap.deploy(timeToken.target);

        // Transfer some tokens to buyer for testing
        await timeToken.transfer(buyer.address, BUYER_TOKENS * DECIMALS);
    });

    describe("TimeToken", function () {
        it("Should have correct name and symbol", async function () {
            expect(await timeToken.name()).to.equal("Time Token");
            expect(await timeToken.symbol()).to.equal("TIME");
        });

        it("Should mint initial tokens to deployer", async function () {
            const balance = await timeToken.balanceOf(owner.address);
            expect(balance).to.equal(
                (INITIAL_TOKENS - BUYER_TOKENS) * DECIMALS
            );
        });

        it("Should allow minting by authorized addresses", async function () {
            const mintAmount = 5n;
            await timeToken.mint(provider.address, mintAmount * DECIMALS);
            const balance = await timeToken.balanceOf(provider.address);
            expect(balance).to.equal(mintAmount * DECIMALS);
        });
    });

    describe("TimeSwap Service Management", function () {
        it("Should create a service correctly", async function () {
            await timeSwap
                .connect(provider)
                .createService(SERVICE_TITLE, SERVICE_DESCRIPTION);

            const service = await timeSwap.services(0);
            expect(service.title).to.equal(SERVICE_TITLE);
            expect(service.description).to.equal(SERVICE_DESCRIPTION);
            expect(service.provider).to.equal(provider.address);
            expect(service.isActive).to.be.true;
            expect(service.reputation).to.equal(0);
        });

        it("Should update service status", async function () {
            await timeSwap
                .connect(provider)
                .createService(SERVICE_TITLE, SERVICE_DESCRIPTION);

            await timeSwap.connect(provider).updateServiceStatus(0, false);
            const service = await timeSwap.services(0);
            expect(service.isActive).to.be.false;
        });

        it("Should not allow non-provider to update service status", async function () {
            await timeSwap
                .connect(provider)
                .createService(SERVICE_TITLE, SERVICE_DESCRIPTION);

            await expect(
                timeSwap.connect(buyer).updateServiceStatus(0, false)
            ).to.be.revertedWith("Not service provider");
        });

        it("Should get user services correctly", async function () {
            await timeSwap
                .connect(provider)
                .createService(SERVICE_TITLE, SERVICE_DESCRIPTION);

            const userServices = await timeSwap.getUserServices(
                provider.address
            );
            expect(userServices).to.have.lengthOf(1);
            expect(userServices[0]).to.equal(0);
        });
    });

    describe("TimeSwap Trading", function () {
        beforeEach(async function () {
            // Create a service first
            await timeSwap
                .connect(provider)
                .createService(SERVICE_TITLE, SERVICE_DESCRIPTION);

            // Approve TimeSwap to spend buyer's tokens
            await timeToken
                .connect(buyer)
                .approve(timeSwap.target, 5n * DECIMALS);
        });

        it("Should initiate a trade correctly", async function () {
            const hours = 5n;
            await timeSwap.connect(buyer).initiateTrade(0, hours);

            const trade = await timeSwap.trades(0);
            expect(trade.buyer).to.equal(buyer.address);
            expect(trade.seller).to.equal(provider.address);
            expect(trade.amount).to.equal(hours * DECIMALS); // Amount is now in tokens with decimals
            expect(trade.serviceId).to.equal(0);
            expect(trade.isCompleted).to.be.false;
            expect(trade.isDisputed).to.be.false;
        });

        it("Should not allow trading with inactive service", async function () {
            await timeSwap.connect(provider).updateServiceStatus(0, false);

            await expect(
                timeSwap.connect(buyer).initiateTrade(0, 5n)
            ).to.be.revertedWith("Service not active");
        });

        it("Should not allow trading with yourself", async function () {
            await timeToken
                .connect(provider)
                .approve(timeSwap.target, 5n * DECIMALS);

            await expect(
                timeSwap.connect(provider).initiateTrade(0, 5n)
            ).to.be.revertedWith("Cannot trade with yourself");
        });

        it("Should not allow trading with insufficient tokens", async function () {
            // Buyer has 10 tokens, try to trade 20 hours (which requires 20 tokens)
            await expect(
                timeSwap.connect(buyer).initiateTrade(0, 20n)
            ).to.be.revertedWith("Insufficient TIME tokens");
        });

        it("Should complete a trade correctly", async function () {
            const hours = 5n;
            await timeSwap.connect(buyer).initiateTrade(0, hours);

            const providerBalanceBefore = await timeToken.balanceOf(
                provider.address
            );
            await timeSwap.connect(provider).completeTrade(0);
            const providerBalanceAfter = await timeToken.balanceOf(
                provider.address
            );

            const trade = await timeSwap.trades(0);
            expect(trade.isCompleted).to.be.true;
            expect(providerBalanceAfter - providerBalanceBefore).to.equal(
                hours * DECIMALS
            );

            // Check reputation update
            const profile = await timeSwap.userProfiles(provider.address);
            expect(profile.successfulTrades).to.equal(1);
            expect(profile.reputation).to.equal(10); // REPUTATION_PER_TRADE
        });

        it("Should not allow completing a non-existent trade", async function () {
            await expect(timeSwap.connect(provider).completeTrade(999n)).to.be
                .reverted;
        });

        it("Should not allow completing a trade twice", async function () {
            await timeSwap.connect(buyer).initiateTrade(0, 5n);
            await timeSwap.connect(provider).completeTrade(0);

            await expect(
                timeSwap.connect(provider).completeTrade(0)
            ).to.be.revertedWith("Trade already completed or disputed");
        });

        it("Should handle disputes correctly", async function () {
            await timeSwap.connect(buyer).initiateTrade(0, 5n);
            await timeSwap.connect(buyer).disputeTrade(0);

            const trade = await timeSwap.trades(0);
            expect(trade.isDisputed).to.be.true;

            // Check reputation penalties
            const buyerProfile = await timeSwap.userProfiles(buyer.address);
            const providerProfile = await timeSwap.userProfiles(
                provider.address
            );
            expect(buyerProfile.reputation).to.equal(0); // Initial reputation
            expect(providerProfile.reputation).to.equal(0); // Initial reputation
        });

        it("Should not allow disputing a completed trade", async function () {
            await timeSwap.connect(buyer).initiateTrade(0, 5n);
            await timeSwap.connect(provider).completeTrade(0);

            await expect(
                timeSwap.connect(buyer).disputeTrade(0)
            ).to.be.revertedWith("Trade already completed or disputed");
        });
    });

    describe("TimeSwap View Functions", function () {
        beforeEach(async function () {
            // Create a service
            await timeSwap
                .connect(provider)
                .createService(SERVICE_TITLE, SERVICE_DESCRIPTION);

            // Create a trade
            await timeToken
                .connect(buyer)
                .approve(timeSwap.target, 5n * DECIMALS);
            await timeSwap.connect(buyer).initiateTrade(0, 5n);
        });

        it("Should get service details correctly", async function () {
            const details = await timeSwap.getServiceDetails(0);
            expect(details.title).to.equal(SERVICE_TITLE);
            expect(details.description).to.equal(SERVICE_DESCRIPTION);
            expect(details.provider).to.equal(provider.address);
            expect(details.isActive).to.be.true;
            expect(details.reputation).to.equal(0);
        });

        it("Should get user trades correctly", async function () {
            const buyerTrades = await timeSwap.getUserTrades(buyer.address);
            const providerTrades = await timeSwap.getUserTrades(
                provider.address
            );

            expect(buyerTrades).to.have.lengthOf(1);
            expect(providerTrades).to.have.lengthOf(1);
            expect(buyerTrades[0]).to.equal(0);
            expect(providerTrades[0]).to.equal(0);
        });
    });
});
