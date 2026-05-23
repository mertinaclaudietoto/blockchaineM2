import { getBrowserProvider } from "./wallet";

/**
 * Vérifie que l’adresse configurée est bien un contrat déployé (pas un wallet EOA).
 */
export async function assertMarketplaceIsContract(marketplaceAddress, userAddress) {
  if (!marketplaceAddress) {
    const err = new Error("NO_CONTRACT");
    throw err;
  }

  const user = userAddress?.toLowerCase();
  const target = marketplaceAddress.toLowerCase();

  if (user && user === target) {
    const err = new Error("CONTRACT_IS_WALLET");
    throw err;
  }

  const provider = getBrowserProvider();
  const code = await provider.getCode(marketplaceAddress);

  if (!code || code === "0x") {
    const err = new Error("NOT_A_CONTRACT");
    throw err;
  }
}
