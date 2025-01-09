const { ethers } = require("ethers");
const crypto = require("crypto");
const ipfs = require("../utils/ipfs");
const { provider, signer } = require("../utils/ethersProvider");
const {
  PRIVACY_ADDRESS,
  PRIVACY_ABI,
  MARKET_ADDRESS,
  MARKET_ABI,
  RLUSD_ADDRESS,
  RLUSD_ABI,
} = require("../utils/contractsConfig");
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const privacyContract = new ethers.Contract(PRIVACY_ADDRESS, PRIVACY_ABI, signer);
const marketContract = new ethers.Contract(MARKET_ADDRESS, MARKET_ABI, signer);
const rlusdContract = new ethers.Contract(RLUSD_ADDRESS, RLUSD_ABI, signer);

exports.processFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const filePath = path.join(__dirname, '../uploads', req.file.filename);

    const pythonProcess = spawn('python3', ['data_processor.py', filePath]);

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        res.status(200).json({ message: 'File processed successfully!', output });
      } else {
        console.error('Python process error:', errorOutput);
        res.status(500).json({ error: 'Python script failed', details: errorOutput });
      }

      fs.unlinkSync(filePath);
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.uploadData = async (req, res) => {
  /**
   * Expects file(s) in `req.file` or `req.files` if using multer.
   * For example:
   * {
   *   "consent": true,
   *   "secretKey": "some-secret",
   *   "userAddress": "0x...User"
   * }
   */
  try {
    const { userAddress, consent, secretKey } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // 1. Encrypt file with `secretKey` (basic example)
    const fileBuffer = req.file.buffer;
    const cipher = crypto.createCipher("aes-256-cbc", secretKey);
    const encrypted = Buffer.concat([cipher.update(fileBuffer), cipher.final()]);

    // 2. Upload encrypted file to IPFS
    const ipfsResult = await ipfs.add(encrypted);
    const cid = ipfsResult.path;

    // 3. Compute a hash of the encrypted data
    const dataHash = ethers.utils.keccak256(encrypted);

    // 4. Update user consent on PrivacyManager
    const tx = await privacyContract.connect(signer).setConsent(
      consent,
      `ipfs://${cid}`,
      dataHash
    );
    await tx.wait();

    res.json({ message: "Data uploaded and consent updated", cid, txHash: tx.hash });
  } catch (error) {
    console.error("Upload Data Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Purchase data access from DataMarketplace
 */
exports.purchaseDataAccess = async (req, res) => {
  try {
    const { buyer } = req.body; // buyer's address
    // Buyer must first approve the marketplace contract to spend RLUSD on their behalf.
    // We'll do the approval here for demonstration, but typically user does it from client side.

    const dataQueryPrice = await marketContract.dataQueryPrice();
    console.log("Data Query Price in Wei:", dataQueryPrice.toString());

    // Approve marketplace to spend RLUSD on buyer's behalf
    const approveTx = await rlusdContract
      .connect(signer)
      .approve(MARKET_ADDRESS, dataQueryPrice);
    await approveTx.wait();

    // Purchase data access
    const tx = await marketContract.connect(signer).purchaseDataAccess();
    await tx.wait();

    res.json({
      message: "Data access purchased successfully!",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("Purchase Data Access Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Distribute rewards to a data provider
 */
exports.distributeRewards = async (req, res) => {
  try {
    const { providerAddress, amount } = req.body;
    // amount is assumed to be in "ethers" (like "10.0"), so we parse it.
    const weiAmount = ethers.utils.parseEther(amount.toString());
    const tx = await marketContract.distributeRewards(providerAddress, weiAmount);
    await tx.wait();

    res.json({
      message: "Rewards distributed successfully!",
      txHash: tx.hash,
    });
  } catch (error) {
    console.error("Distribute Rewards Error:", error);
    res.status(500).json({ error: error.message });
  }
};
