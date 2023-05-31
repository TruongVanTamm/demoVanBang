const hre = require('hardhat');

const CollectionBuildName = "Collection";

const decimals = 10**18;

async function main() {
    const[deployer] = await hre.ethers.getSigners();

    console.log("====================\n\r");
    console.log("Deploying contract with the account: ", deployer.address);
    console.log("Account balace: ", ((await deployer.getBalance()) / decimals).toString());
    console.log("==================\n\r");

    const CollectionFactory = await hre.ethers.getContractFactory(CollectionBuildName);
    const CollectionArtifact = await hre.artifacts.readArtifact(CollectionBuildName);

    const CollectionDeploy = await CollectionFactory.deploy("TEST","TEST");

    await CollectionDeploy.deployed();

    console.log(`${CollectionArtifact.contractName} implementation address: ${CollectionDeploy.address}`);

    console.log("===========");

}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });