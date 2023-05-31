require("@nomiclabs/hardhat-ethers");
const hre = require("hardhat");
const ManagerBuildName = "Manager";
const decimals = 10 ** 18;
const proxyType = { kind: "uups" };
async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("==============================================\n\r");
  console.log("Deploying contracts with the account:", deployer.address);
  console.log(
    "Account balance: ",
    ((await deployer.getBalance()) / decimals).toString()
  );
  console.log("=================================\n\r");
  const ManagerManager = await hre.ethers.getContractFactory(ManagerBuildName);
  const ManagerArtifact = await hre.artifacts.readArtifact(ManagerBuildName);
  const ManagerContract = await hre.upgrades.deployProxy(
    ManagerManager,
    [],
    proxyType
  );
  console.log(`Manager_CONTRACT_ADDRESS: ${ManagerContract.address}`);
  await ManagerContract.deployed();
  implementtationAddress = await hre.upgrades.erc1967.getImplementationAddress(
    ManagerContract.address
  );
  console.log(
    `${ManagerArtifact.contractName} implementation address: ${implementtationAddress}`
  );
  console.log("===========================\n\r");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
