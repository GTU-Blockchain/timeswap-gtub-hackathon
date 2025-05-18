# TimeSwap Documentation

TimeSwap is a decentralized time-trading platform built on blockchain technology. It allows users to trade their time as a service using TIME tokens, where each token represents exactly one hour of service at a fixed rate of 1 TIME token per hour.

## Table of Contents

-   [Contracts Overview](#contracts-overview)
-   [TimeToken Contract](#timetoken-contract)
-   [TimeSwap Contract](#timeswap-contract)
-   [Deployment](#deployment)
-   [Usage Guide](#usage-guide)

## Contracts Overview

The system consists of two main contracts:

1. `TimeToken`: An ERC20 token representing hours of service
2. `TimeSwap`: The main platform contract for service trading

## TimeToken Contract

### Overview

TimeToken is an ERC20 token where each token represents one hour of service. The token implements the standard ERC20 interface with additional minting capabilities.

### Constructor

```solidity
constructor() ERC20("Time Token", "TIME")
```

-   Initializes the token with name "Time Token" and symbol "TIME"
-   Mints 24 TIME tokens to the deployer's address (representing 24 hours)

### Functions

#### `mint(address to, uint256 amount) external`

-   Mints new TIME tokens to a specified address
-   Only callable by authorized addresses
-   Parameters:
    -   `to`: Address to receive the tokens
    -   `amount`: Number of tokens to mint

## TimeSwap Contract

### Overview

TimeSwap is the main platform contract that facilitates the trading of time-based services. It includes features for service management, trading, and reputation tracking.

### State Variables

#### Public Variables

-   `timeToken`: Address of the TimeToken contract
-   `serviceCounter`: Counter for service IDs
-   `tradeCounter`: Counter for trade IDs
-   `REPUTATION_PER_TRADE`: Constant (10) - Reputation points earned per successful trade
-   `DISPUTE_PENALTY`: Constant (20) - Reputation points deducted for disputes

### Data Structures

#### Service

```solidity
struct Service {
    string title;
    string description;
    address provider;
    bool isActive;
    uint256 reputation;
}
```

#### Trade

```solidity
struct Trade {
    address buyer;
    address seller;
    uint256 amount;      // in TIME tokens
    uint256 serviceId;
    bool isCompleted;
    bool isDisputed;
    uint256 timestamp;
}
```

#### UserProfile

```solidity
struct UserProfile {
    uint256 reputation;
    uint256 totalTrades;
    uint256 successfulTrades;
}
```

### Events

#### Service Events

-   `ServiceCreated(uint256 indexed serviceId, address indexed provider, string title)`
-   `ServiceUpdated(uint256 indexed serviceId, bool isActive)`

#### Trade Events

-   `TradeInitiated(uint256 indexed tradeId, address indexed buyer, address indexed seller)`
-   `TradeCompleted(uint256 indexed tradeId)`
-   `TradeDisputed(uint256 indexed tradeId)`

#### Reputation Events

-   `ReputationUpdated(address indexed user, uint256 newReputation)`

### Functions

#### Service Management

##### `createService(string memory _title, string memory _description) external`

-   Creates a new service listing
-   Parameters:
    -   `_title`: Service title
    -   `_description`: Service description
-   Note: All services are priced at 1 TIME token per hour
-   Emits: `ServiceCreated`

##### `updateServiceStatus(uint256 _serviceId, bool _isActive) external`

-   Updates the active status of a service
-   Parameters:
    -   `_serviceId`: ID of the service
    -   `_isActive`: New active status
-   Requirements:
    -   Caller must be the service provider
-   Emits: `ServiceUpdated`

#### Trading Functions

##### `initiateTrade(uint256 _serviceId, uint256 _hours) external nonReentrant`

-   Initiates a new trade for a service
-   Parameters:
    -   `_serviceId`: ID of the service
    -   `_hours`: Number of hours to trade (costs 1 TIME token per hour)
-   Requirements:
    -   Service must be active
    -   Cannot trade with yourself
    -   Must have sufficient TIME tokens (hours \* 1 TIME token)
-   Emits: `TradeInitiated`

##### `completeTrade(uint256 _tradeId) external nonReentrant`

-   Completes a trade and transfers tokens
-   Parameters:
    -   `_tradeId`: ID of the trade
-   Requirements:
    -   Only seller can complete
    -   Trade must not be completed or disputed
-   Emits: `TradeCompleted`, `ReputationUpdated`

##### `disputeTrade(uint256 _tradeId) external`

-   Initiates a dispute for a trade
-   Parameters:
    -   `_tradeId`: ID of the trade
-   Requirements:
    -   Must be a trade participant
    -   Trade must not be completed or disputed
-   Emits: `TradeDisputed`, `ReputationUpdated`

#### View Functions

##### `getUserServices(address _user) external view returns (uint256[] memory)`

-   Returns array of service IDs created by a user

##### `getUserTrades(address _user) external view returns (uint256[] memory)`

-   Returns array of trade IDs associated with a user

##### `getServiceDetails(uint256 _serviceId) external view returns (...)`

-   Returns detailed information about a service
-   Returns:
    -   `title`: Service title
    -   `description`: Service description
    -   `provider`: Service provider address
    -   `isActive`: Service status
    -   `reputation`: Provider's reputation

## Deployment

The contracts are deployed using Hardhat Ignition. The deployment module handles the deployment order and dependencies:

```javascript
// ignition/modules/TimeSwap.js
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("TimeSwapModule", (m) => {
    const timeToken = m.contract("TimeToken");
    const timeSwap = m.contract("TimeSwap", [timeToken]);
    return { timeToken, timeSwap };
});
```

To deploy:

```bash
npx hardhat ignition deploy ignition/modules/TimeSwap.js
```

## Usage Guide

### Basic Workflow

1. **Initial Setup**

    - Deploy contracts using the Ignition module
    - Deployer receives 24 TIME tokens initially (representing 24 hours)

2. **Creating a Service**

    ```solidity
    // Create a service (automatically priced at 1 TIME token per hour)
    timeSwap.createService("Web Development", "Full-stack development services");
    ```

3. **Initiating a Trade**

    ```solidity
    // First approve TimeSwap to spend tokens
    // For 5 hours of service, you need 5 TIME tokens
    timeToken.approve(timeSwapAddress, 5);
    // Then initiate a trade for 5 hours
    timeSwap.initiateTrade(serviceId, 5);
    ```

4. **Completing a Trade**

    ```solidity
    // Service provider completes the trade
    timeSwap.completeTrade(tradeId);
    ```

5. **Handling Disputes**
    ```solidity
    // Either party can initiate a dispute
    timeSwap.disputeTrade(tradeId);
    ```

### Security Considerations

-   The contract uses OpenZeppelin's `ReentrancyGuard` for protection against reentrancy attacks
-   The `Ownable` contract provides basic access control
-   All critical functions include appropriate access controls and state checks
-   Token transfers are handled through the standard ERC20 interface

### Gas Optimization

-   Events are indexed appropriately for efficient filtering
-   State variables are packed efficiently
-   View functions are used for read-only operations
-   Critical functions use `nonReentrant` modifier for security
