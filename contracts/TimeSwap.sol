// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TimeToken is ERC20 {
    constructor() ERC20("Time Token", "TIME") {
        // Each user gets 24 TIME tokens initially (representing 24 hours)
        _mint(msg.sender, 24 * 10 ** decimals());
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract TimeSwap is ReentrancyGuard, Ownable {
    TimeToken public timeToken;

    struct Service {
        string title;
        string description;
        address provider;
        bool isActive;
        uint256 reputation;
    }

    struct Trade {
        address buyer;
        address seller;
        uint256 amount; // in TIME tokens
        uint256 serviceId;
        bool isCompleted;
        bool isDisputed;
        uint256 timestamp;
    }

    struct UserProfile {
        uint256 reputation;
        uint256 totalTrades;
        uint256 successfulTrades;
    }

    // Mappings
    mapping(uint256 => Service) public services;
    mapping(uint256 => Trade) public trades;
    mapping(address => UserProfile) public userProfiles;
    mapping(address => uint256[]) public userServices;
    mapping(address => uint256[]) public userTrades;

    // State variables
    uint256 public serviceCounter;
    uint256 public tradeCounter;
    uint256 public constant REPUTATION_PER_TRADE = 10;
    uint256 public constant DISPUTE_PENALTY = 20;

    // Events
    event ServiceCreated(
        uint256 indexed serviceId,
        address indexed provider,
        string title
    );
    event ServiceUpdated(uint256 indexed serviceId, bool isActive);
    event TradeInitiated(
        uint256 indexed tradeId,
        address indexed buyer,
        address indexed seller
    );
    event TradeCompleted(uint256 indexed tradeId);
    event TradeDisputed(uint256 indexed tradeId);
    event ReputationUpdated(address indexed user, uint256 newReputation);

    constructor(TimeToken _timeToken) Ownable(msg.sender) {
        timeToken = _timeToken;
    }

    // Service Management
    function createService(
        string memory _title,
        string memory _description
    ) external {
        uint256 serviceId = serviceCounter++;
        services[serviceId] = Service({
            title: _title,
            description: _description,
            provider: msg.sender,
            isActive: true,
            reputation: 0
        });

        userServices[msg.sender].push(serviceId);
        emit ServiceCreated(serviceId, msg.sender, _title);
    }

    function updateServiceStatus(uint256 _serviceId, bool _isActive) external {
        Service storage service = services[_serviceId];
        require(service.provider == msg.sender, "Not service provider");
        service.isActive = _isActive;
        emit ServiceUpdated(_serviceId, _isActive);
    }

    // Trading Functions
    function initiateTrade(
        uint256 _serviceId,
        uint256 _hours
    ) external nonReentrant {
        Service storage service = services[_serviceId];
        require(service.isActive, "Service not active");
        require(service.provider != msg.sender, "Cannot trade with yourself");

        uint256 amount = _hours * 10 ** timeToken.decimals(); // Convert hours to token amount with decimals
        require(
            timeToken.balanceOf(msg.sender) >= amount,
            "Insufficient TIME tokens"
        );

        // Transfer tokens to contract (escrow)
        require(
            timeToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );

        uint256 tradeId = tradeCounter++;
        trades[tradeId] = Trade({
            buyer: msg.sender,
            seller: service.provider,
            amount: amount, // Store the token amount with decimals
            serviceId: _serviceId,
            isCompleted: false,
            isDisputed: false,
            timestamp: block.timestamp
        });

        userTrades[msg.sender].push(tradeId);
        userTrades[service.provider].push(tradeId);

        emit TradeInitiated(tradeId, msg.sender, service.provider);
    }

    function completeTrade(uint256 _tradeId) external nonReentrant {
        Trade storage trade = trades[_tradeId];
        require(msg.sender == trade.seller, "Only seller can complete");
        require(
            !trade.isCompleted && !trade.isDisputed,
            "Trade already completed or disputed"
        );

        trade.isCompleted = true;

        // Transfer tokens to seller (amount already includes decimals)
        require(
            timeToken.transfer(trade.seller, trade.amount),
            "Transfer failed"
        );

        // Update reputation
        UserProfile storage sellerProfile = userProfiles[trade.seller];
        sellerProfile.successfulTrades++;
        sellerProfile.reputation += REPUTATION_PER_TRADE;

        emit TradeCompleted(_tradeId);
        emit ReputationUpdated(trade.seller, sellerProfile.reputation);
    }

    function disputeTrade(uint256 _tradeId) external {
        Trade storage trade = trades[_tradeId];
        require(
            msg.sender == trade.buyer || msg.sender == trade.seller,
            "Not a trade participant"
        );
        require(
            !trade.isCompleted && !trade.isDisputed,
            "Trade already completed or disputed"
        );

        trade.isDisputed = true;

        // Apply reputation penalty
        UserProfile storage buyerProfile = userProfiles[trade.buyer];
        UserProfile storage sellerProfile = userProfiles[trade.seller];

        if (buyerProfile.reputation > DISPUTE_PENALTY) {
            buyerProfile.reputation -= DISPUTE_PENALTY;
        }
        if (sellerProfile.reputation > DISPUTE_PENALTY) {
            sellerProfile.reputation -= DISPUTE_PENALTY;
        }

        emit TradeDisputed(_tradeId);
        emit ReputationUpdated(trade.buyer, buyerProfile.reputation);
        emit ReputationUpdated(trade.seller, sellerProfile.reputation);
    }

    function getServices() external view returns (Service[] memory) {
        Service[] memory allServices = new Service[](serviceCounter);
        for (uint256 i = 0; i < serviceCounter; i++) {
            allServices[i] = services[i];
        }
        return allServices;
    }

    // View Functions
    function getUserServices(
        address _user
    ) external view returns (uint256[] memory) {
        return userServices[_user];
    }

    function getUserTrades(
        address _user
    ) external view returns (uint256[] memory) {
        return userTrades[_user];
    }

    function getServiceDetails(
        uint256 _serviceId
    )
        external
        view
        returns (
            string memory title,
            string memory description,
            address provider,
            bool isActive,
            uint256 reputation
        )
    {
        Service storage service = services[_serviceId];
        return (
            service.title,
            service.description,
            service.provider,
            service.isActive,
            service.reputation
        );
    }
}
