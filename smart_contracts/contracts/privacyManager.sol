// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./zkProofVerifier.sol";

/**
 * @title PrivacyManager
 * @dev Manages user registration, ZK-proof verification, and consent for data sharing
 */
contract PrivacyManager {
    ZkProofVerifier public verifier;

    // constructor(address _zkProofVerifier) {
    //     verifier = ZkProofVerifier(_zkProofVerifier);
    // }

    struct UserInfo {
        bool exists;
        bool consent;
        string dataURI;    // IPFS/Filecoin URI (CID)
        bytes32 dataHash;  // Hash of encrypted data
    }

    mapping(address => UserInfo) private users;

    event UserRegistered(address indexed user);
    event ConsentUpdated(address indexed user, bool consent, string dataURI, bytes32 dataHash);

    constructor(address _zkProofVerifier) {
        verifier = ZkProofVerifier(_zkProofVerifier);
    }

    modifier onlyRegistered() {
        require(users[msg.sender].exists, "PrivacyManager: User not registered");
        _;
    }

    /**
     * @dev Registers a new user via a zero-knowledge proof.
     * @param _proof The Groth16 proof struct (A, B, C).
     * @param _publicSignals The array of public signals needed for verification.
     */
    function registerUser(
        ZkProofVerifier.Proof memory _proof, 
        uint256[] memory _publicSignals
    ) external {
        require(!users[msg.sender].exists, "PrivacyManager: Already registered");

        // Verify the user's ZK proof
        bool proofValid = verifier.verifyProof(_proof, _publicSignals);
        require(proofValid, "PrivacyManager: Invalid ZK proof");

        users[msg.sender] = UserInfo({
            exists: true,
            consent: false,
            dataURI: "",
            dataHash: 0
        });

        emit UserRegistered(msg.sender);
    }

    /**
     * @dev Allows a registered user to update their consent and data references.
     * @param _consent True/False for consenting to share data
     * @param _dataURI IPFS/Filecoin CID with encrypted data
     * @param _dataHash A keccak256 or SHA256 hash of the encrypted data
     */
    function setConsent(
        bool _consent, 
        string calldata _dataURI, 
        bytes32 _dataHash
    ) external onlyRegistered {
        users[msg.sender].consent = _consent;
        users[msg.sender].dataURI = _dataURI;
        users[msg.sender].dataHash = _dataHash;

        emit ConsentUpdated(msg.sender, _consent, _dataURI, _dataHash);
    }

    /**
     * @dev Retrieve the user info for an address. (In production, consider access controls here!)
     */
    function getUserInfo(address _user) 
        external 
        view 
        returns (bool exists, bool consent, string memory dataURI, bytes32 dataHash) 
    {
        UserInfo memory info = users[_user];
        return (info.exists, info.consent, info.dataURI, info.dataHash);
    }

    /**
     * @dev Checks whether an address is registered.
     */
    function isRegistered(address _user) external view returns (bool) {
        return users[_user].exists;
    }
}
