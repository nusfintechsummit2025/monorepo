require("dotenv").config();
const RLUSD_ABI = require("../../frontend/src/abis/RLUSDStablecoin.json");
const PRIVACY_ABI = require("../../frontend/src/abis/PrivacyManager.json");
const MARKET_ABI = require("../../frontend/src/abis/DataMarketplace.json");

// Suppose these are addresses from your Hardhat deployment:
const RLUSD_ADDRESS = process.env.RLUSD_ADDRESS;
const PRIVACY_ADDRESS = process.env.PRIVACY_ADDRESS;
const MARKET_ADDRESS = process.env.MARKET_ADDRESS;
const ZK_PROOF_VERIFIER_ADDRESS = process.env.ZK_PROOF_VERIFIER_ADDRESS;

module.exports = {
  RLUSD_ABI,
  PRIVACY_ABI,
  MARKET_ABI,
  RLUSD_ADDRESS,
  PRIVACY_ADDRESS,
  MARKET_ADDRESS,
  ZK_PROOF_VERIFIER_ADDRESS,
};
