// scripts/deploy.js
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy RewardToken (ERC20)
//   const RewardToken = await hre.ethers.getContractFactory("RewardToken");
//   const rewardToken = await RewardToken.deploy("RewardToken", "RWT", 1000000);
//   await rewardToken.deployed();
//   console.log("RewardToken deployed to:", rewardToken.address);

  // Deploy zkProofVerifier
    const zkProofVerifier = await hre.ethers.getContractFactory("zkProofVerifier");
    const zkProofVerifierInstance = await zkProofVerifier.deploy();
    await zkProofVerifierInstance.deployed();
    console.log("zkProofVerifier deployed to:", zkProofVerifierInstance.address);


  // Deploy PrivacyManager
  const PrivacyManager = await hre.ethers.getContractFactory("PrivacyManager");
  const privacyManager = await PrivacyManager.deploy();
  await privacyManager.deployed();
  console.log("PrivacyManager deployed to:", privacyManager.address);

  // Deploy DataMarketplace
  const DataMarketplace = await hre.ethers.getContractFactory("DataMarketplace");
  const dataMarketplace = await DataMarketplace.deploy(rewardToken.address, hre.ethers.utils.parseEther("10"));
  await dataMarketplace.deployed();
  console.log("DataMarketplace deployed to:", dataMarketplace.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
