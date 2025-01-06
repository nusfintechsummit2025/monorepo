const { ethers } = require("ethers");

const XRPL_EVM_RPC = process.env.XRPL_EVM_RPC;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

let provider, signer;

if (!XRPL_EVM_RPC || !PRIVATE_KEY) {
  console.error("Missing XRPL_EVM_RPC or PRIVATE_KEY in .env");
  process.exit(1);
}

provider = new ethers.providers.JsonRpcProvider(XRPL_EVM_RPC);
signer = new ethers.Wallet(PRIVATE_KEY, provider);

module.exports = { provider, signer };
