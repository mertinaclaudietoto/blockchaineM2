/** Adresse du contrat NFTMarketplace déployé sur Sepolia (Vite). */
export const MARKETPLACE_ADDRESS =
  import.meta.env.VITE_NFT_MARKETPLACE_ADDRESS?.trim() ?? "";

export const HAS_MARKETPLACE =
  /^0x[a-fA-F0-9]{40}$/.test(MARKETPLACE_ADDRESS);
