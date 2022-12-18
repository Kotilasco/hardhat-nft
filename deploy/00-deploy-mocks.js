const { developmentChains } = require("../helper-hardhat-config")

module.exports = async function (hre) {
    const { deployments, getNamedAccounts, network, ethers } = hre
    const DECIMALS = "18"
    const INITIAL_PRICE = ethers.utils.parseUnits("200", "ether")
    const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium.it cost 0.25 LINK per request
    const GAS_PRICE_LINK = 1e9 // 1000000000 // link per gas. calculated value based on the gas price of the

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (developmentChains.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        // deploy a mock vrfCoordinatorV2Mock
        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            args: args,
            log: true,
        })
        await deploy("MockV3Aggregator", {
            from: deployer,
            args: [DECIMALS, INITIAL_PRICE],
            log: true,
        })
        log("Mocks Deployed")
        log("------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
