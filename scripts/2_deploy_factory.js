require('@nomiclabs/hardhat-ethers');

const hre = require('hardhat');

const FactoryBuildName = "Factory";

const decimals = 10**18;

const proxyType = { kind: "uups" };

async function main() {
    const[deployer] = await hre.ethers.getSigners();

    console.log("==============================================\n\r");
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance: ", ((await deployer.getBalance()) / decimals).toString());
    console.log("=================================\n\r");

    const FactoryFactory = await hre.ethers.getContractFactory(FactoryBuildName);
    const FactoryArtifact = await hre.artifacts.readArtifact(FactoryBuildName);
    const FactoryContract = await hre.upgrades.deployProxy(FactoryFactory,[],proxyType);


    console.log(`FACTORY_CONTRACT_ADDRESS: ${FactoryContract.address}`);

    await FactoryContract.deployed();
    implementtationAddress = await hre.upgrades.erc1967.getImplementationAddress(FactoryContract.address);

    console.log(`${FactoryArtifact.contractName} implementation address: ${implementtationAddress}`);

    console.log("===========================\n\r");
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });