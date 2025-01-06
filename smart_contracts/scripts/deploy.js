// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // 1. Deploy RLUSD Stablecoin (1,000,000 initial supply)
  const RLUSDStablecoin = await hre.ethers.getContractFactory("RLUSDStablecoin");
  const rlusd = await RLUSDStablecoin.deploy(1000000);
  await rlusd.deployed();
  console.log("RLUSDStablecoin deployed to:", rlusd.address);

  // 2. Deploy ZkProofVerifier
  const ZkProofVerifier = await hre.ethers.getContractFactory("ZkProofVerifier");
  const verifier = await ZkProofVerifier.deploy();
  await verifier.deployed();
  console.log("ZkProofVerifier deployed to:", verifier.address);

  // 3. Deploy PrivacyManager
  const PrivacyManager = await hre.ethers.getContractFactory("PrivacyManager");
  const privacyManager = await PrivacyManager.deploy(verifier.address);
  await privacyManager.deployed();
  console.log("PrivacyManager deployed to:", privacyManager.address);

  // 4. Deploy DataMarketplace
  const DataMarketplace = await hre.ethers.getContractFactory("DataMarketplace");
  // Let's set the initial query price to 10 RLUSD (10 * 10^18 in Wei)
  const dataMarketplace = await DataMarketplace.deploy(
    rlusd.address,
    hre.ethers.utils.parseEther("10")
  );
  await dataMarketplace.deployed();
  console.log("DataMarketplace deployed to:", dataMarketplace.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
