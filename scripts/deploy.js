const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying MedicalReimbursement contract to Lisk...");

  // Get the contract factory
  const MedicalReimbursement = await ethers.getContractFactory("MedicalReimbursement");
  
  // Deploy the contract
  const medicalReimbursement = await ethers.deployContract("MedicalReimbursement");
  
  // Wait for deployment to finish
  await medicalReimbursement.waitForDeployment();
  
  const address = await medicalReimbursement.getAddress();
  
  console.log("✅ MedicalReimbursement deployed successfully!");
  console.log("📍 Contract address:", address);
  console.log("👤 Contract owner:", await medicalReimbursement.owner());
  
  // Verify the deployment
  console.log("\n🔍 Deployment verification:");
  console.log("💰 Total funds:", ethers.formatEther(await medicalReimbursement.totalFunds()), "ETH");
  console.log("💸 Claim processing fee:", ethers.formatEther(await medicalReimbursement.claimProcessingFee()), "ETH");
  console.log("⏱️  Minimum subscription duration:", await medicalReimbursement.minimumSubscriptionDuration(), "seconds");
  
  console.log("\n🚀 Next steps:");
  console.log("1. Verify your contract on Blockscout:");
  console.log(`   npx hardhat verify --network lisk-sepolia ${address}`);
  console.log("2. View your contract on Blockscout:");
  console.log(`   https://sepolia-blockscout.lisk.com/address/${address}`);
  console.log("3. Interact with your contract using the Blockscout interface");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
