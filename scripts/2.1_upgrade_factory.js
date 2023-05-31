require('@nomiclabs/hardhat-ethers');

const hre = require('hardhat');
const { Data } = require('./.data.json');

const FactoryProxyAddr = Data.FACTORY_ADDRESS;

const FactoryBuildName = "Factory";

const decimals = 10**18;

async function main() {
    const[deployer] = await hre.ethers.getSigners();

    console.log("==============================");
    console.log("Upgrading contract with the account: ", deployer.address);
    console.log("Account balance: " , ((await deployer.getBalance())/decimals).toString());
    console.log("=============================\n\r");

    const FactoryFactoryV1 = await hre.ethers.getContractFactory(FactoryBuildName);
    const FactoryArtifactV1 = await hre.artifacts.readArtifact(FactoryBuildName);
    const FactoryContractV1 = FactoryFactoryV1.attach(FactoryProxyAddr);

    const FactoryIV1 = await hre.upgrades.erc1967.getImplementationAddress(FactoryContractV1.address);

    console.log(`Upgrading ${FactoryArtifactV1.contractName} at proxy : ${FactoryContractV1.address}`);
    console.log(`Current implementation address: ${FactoryIV1}`);

    const FactoryFactoryV2 = await hre.ethers.getContractFactory(FactoryBuildName);
    const FactoryArtifactv2 = await hre.artifacts.readArtifact(FactoryBuildName);
    const FactoryContractV2 = await hre.upgrades.upgradeProxy(FactoryContractV1, FactoryFactoryV2);

    await FactoryContractV2.deployed();

    const FactoryIV2 = await hre.upgrades.erc1967.getImplementationAddress(FactoryContractV2.address);

    console.log(`${FactoryArtifactv2.contractName} deployed to ${FactoryContractV2.address}`);
    console.log(`New implementation Address: ${FactoryIV2}`);


    console.log("=================================\n\r");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });