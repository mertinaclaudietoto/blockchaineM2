import { network } from "hardhat";

/**
 * Déploie NFTMarketplace sur Sepolia.
 * Prérequis dans .env (racine du projet) :
 *   SEPOLIA_RPC_URL=https://...
 *   SEPOLIA_PRIVATE_KEY=0x... (clé du wallet de déploiement, avec ETH Sepolia)
 *
 * Puis : npm run deploy:sepolia
 * Copiez l’adresse affichée dans VITE_NFT_MARKETPLACE_ADDRESS et redémarrez npm run dev.
 */
const { ethers } = await network.create();

const marketplace = await ethers.deployContract("NFTMarketplace");
await marketplace.waitForDeployment();

const address = await marketplace.getAddress();
console.log("\n✅ NFTMarketplace déployé sur Sepolia :\n");
console.log(address);
console.log("\nAjoutez dans .env :\n");
console.log(`VITE_NFT_MARKETPLACE_ADDRESS=${address}\n`);
