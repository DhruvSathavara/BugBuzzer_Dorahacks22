const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const mintContractParent = await hre.ethers.getContractFactory("mintContractParent");
  const mintcontractParent = await mintContractParent.deploy();
  
  console.log("mintContractParent contract address:", mintcontractParent.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });