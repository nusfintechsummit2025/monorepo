// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./RLUSDStablecoin.sol";

/**
 * @title DataMarketplace
 * @dev Manages data queries, reward distribution using RLUSD, and a basic reputation system.
 */
contract DataMarketplace {

    RLUSDStablecoin public rlusd;
    address public owner;
    uint256 public dataQueryPrice;

    // constructor(address _rlusdToken, uint256 _initialQueryPrice) {
    //     rlusd = RLUSDStablecoin(_rlusdToken);
    //     dataQueryPrice = _initialQueryPrice;
    //     owner = msg.sender;
    // }

    // Reputation mapping
    mapping(address => uint256) private reputation;

    // Events
    event QueryPurchased(address indexed buyer, uint256 price);
    event RewardsDistributed(address indexed provider, uint256 amount);
    event ReputationUpdated(address indexed user, uint256 newScore);
    event DataQueryPriceUpdated(uint256 newPrice);

    modifier onlyOwner() {
        require(msg.sender == owner, "DataMarketplace: Not contract owner");
        _;
    }

    constructor(address _rlusdToken, uint256 _initialQueryPrice) {
        rlusd = RLUSDStablecoin(_rlusdToken);
        dataQueryPrice = _initialQueryPrice;
        owner = msg.sender;
    }

    /**
     * @dev Update the cost of a data query in RLUSD. Only owner can set this.
     */
    function setDataQueryPrice(uint256 _newPrice) external onlyOwner {
        dataQueryPrice = _newPrice;
        emit DataQueryPriceUpdated(_newPrice);
    }

    /**
     * @dev Allows a researcher to purchase data access by paying RLUSD to this contract.
     */
    function purchaseDataAccess() external {
        require(
            rlusd.transferFrom(msg.sender, address(this), dataQueryPrice),
            "DataMarketplace: RLUSD transfer failed"
        );
        emit QueryPurchased(msg.sender, dataQueryPrice);

        // Off-chain aggregator will listen to this event, handle queries/federated learning, etc.
    }

    /**
     * @dev Distributes RLUSD rewards to data providers after successful federated learning or data usage.
     * Only the owner (or aggregator) can call this.
     */
    function distributeRewards(address _provider, uint256 _amount) external onlyOwner {
        // Transfer RLUSD out from contract to the provider
        bool success = rlusd.transfer(_provider, _amount);
        require(success, "DataMarketplace: RLUSD transfer failed");
        emit RewardsDistributed(_provider, _amount);
    }

    /**
     * @dev Updates a user's reputation score. Only owner can call this.
     */
    function updateReputation(address _user, uint256 _newScore) external onlyOwner {
        reputation[_user] = _newScore;
        emit ReputationUpdated(_user, _newScore);
    }

    /**
     * @dev Retrieves the reputation score of a user.
     */
    function getReputation(address _user) external view returns (uint256) {
        return reputation[_user];
    }
}
