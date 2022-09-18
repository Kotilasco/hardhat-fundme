require("dotenv").config()
require("@nomiclabs/hardhat-etherscan")
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("solidity-coverage")
require("hardhat-deploy")

const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const API_KEY = process.env.ETHERSCAN_APIKEY
const COINMARKETCAP = process.env.COINMARKETCAP

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    //solidity: "0.8.8",
    solidity: {
        compilers: [
            {
                version: "0.8.8",
            },
            {
                version: "0.6.6",
            },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        rinkeby: {
            url: process.env.RINKEBY_RPC_URL || "",
            accounts: [PRIVATE_KEY],
            chainId: 4,
            blockConfirmations: 6,
        },
        goerli: {
            url: process.env.GOERLI_RPC_URL || "",
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
        },
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP,
        currency: "USD",
        token: "ETH",
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_APIKEY,
    },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user: {
            default: 1,
        },
    },
}
