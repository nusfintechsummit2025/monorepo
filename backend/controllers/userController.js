const { ethers } = require("ethers");
const { provider, signer } = require("../utils/ethersProvider");
const {
  PRIVACY_ADDRESS,
  PRIVACY_ABI,
} = require("../utils/contractsConfig");
const privacyContract = new ethers.Contract(PRIVACY_ADDRESS, PRIVACY_ABI, signer);

exports.registerUser = async (req, res) => {
  try {
    /**
     * Expects in request body:
     * {
     *   "proof": {
     *     "a": "0x...",
     *     "b": "0x...",
     *     "c": "0x..."
     *   },
     *   "publicSignals": [ ... ]
     * }
     */
    const { proof, publicSignals } = req.body;
    if (!proof || !publicSignals) {
      return res.status(400).json({ error: "Missing proof or publicSignals" });
    }

    // Convert proof fields to the structure your contract expects
    // e.g. ZkProofVerifier.Proof (a, b, c)
    // We'll assume a/b/c are strings or arrays. Adjust as needed.
    const tx = await privacyContract.registerUser(
      {
        a: proof.a,
        b: proof.b,
        c: proof.c,
      },
      publicSignals
    );
    await tx.wait();

    res.json({ message: "User registered successfully!", txHash: tx.hash });
  } catch (error) {
    console.error("Register User Error:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { userAddress } = req.params;
    const [exists, consent, dataURI, dataHash] = await privacyContract.getUserInfo(userAddress);
    res.json({ exists, consent, dataURI, dataHash });
  } catch (error) {
    console.error("Get User Info Error:", error);
    res.status(500).json({ error: error.message });
  }
};
