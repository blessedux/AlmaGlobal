require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.23", // Updated to match Lisk's recommended version
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    // Lisk Mainnet
    'lisk': {
      url: 'https://rpc.api.lisk.com',
      accounts: process.env.WALLET_KEY ? [process.env.WALLET_KEY] : [],
      gasPrice: 1000000000,
      chainId: 1135,
    },
    // Lisk Sepolia Testnet
    'lisk-sepolia': {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: process.env.WALLET_KEY ? [process.env.WALLET_KEY] : [],
      gasPrice: 1000000000,
      chainId: 4202,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  // Lisk uses Blockscout, not Etherscan
  etherscan: {
    apiKey: {
      "lisk": "123", // Placeholder - Blockscout doesn't need real API key
      "lisk-sepolia": "123", // Placeholder - Blockscout doesn't need real API key
    },
    customChains: [
      {
        network: "lisk",
        chainId: 1135,
        urls: {
          apiURL: "https://blockscout.lisk.com/api",
          browserURL: "https://blockscout.lisk.com"
        }
      },
      {
        network: "lisk-sepolia",
        chainId: 4202,
        urls: {
          apiURL: "https://sepolia-blockscout.lisk.com/api",
          browserURL: "https://sepolia-blockscout.lisk.com"
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  },
};
