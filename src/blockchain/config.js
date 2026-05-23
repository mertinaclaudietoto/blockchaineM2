/** Réseau Sepolia (testnet Ethereum). */
export const SEPOLIA_CHAIN_ID = 11155111n;
export const SEPOLIA_CHAIN_ID_HEX = "0xaa36a7";

export const SEPOLIA_NETWORK = {
  chainId: SEPOLIA_CHAIN_ID_HEX,
  chainName: "Sepolia",
  nativeCurrency: { name: "Sepolia ETH", symbol: "ETH", decimals: 18 },
  rpcUrls: ["https://rpc.sepolia.org", "https://ethereum-sepolia-rpc.publicnode.com"],
  blockExplorerUrls: ["https://sepolia.etherscan.io"],
};

export const SEPOLIA_CHAIN_LABEL = "Sepolia";

/** Nombre max de tokenId à scanner lors de la synchro (mint séquentiel). */
export const MAX_TOKEN_SCAN = 48;
