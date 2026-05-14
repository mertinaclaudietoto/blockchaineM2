/** Données de démonstration — aucun appel réseau, contrat ERC-721 fictif. */
export const DEMO_WALLET = "0x71C…9A2e";
export const DEMO_CONTRACT = "0x8f3a…e4B1";
export const DEMO_CHAIN = "Sepolia (simulation)";
export const DEMO_COLLECTION_NAME = "Axies Genesis";

export function createInitialNfts() {
  return [
    {
      tokenId: 1,
      name: "Neon Genesis",
      description: "Édition limitée, style cyberpunk.",
      imageUrl: "https://picsum.photos/seed/nft1/480/480",
      creator: "0x4a2…c81f",
      owner: "0x4a2…c81f",
      listed: true,
      priceEth: 0.12,
    },
    {
      tokenId: 2,
      name: "Aube liquide",
      description: "Couleurs fluides, calme digital.",
      imageUrl: "https://picsum.photos/seed/nft2/480/480",
      creator: "0x9bb…01d3",
      owner: "0x9bb…01d3",
      listed: true,
      priceEth: 0.45,
    },
    {
      tokenId: 3,
      name: "Bloc #7",
      description: "Géométrie brute, série Blocks.",
      imageUrl: "https://picsum.photos/seed/nft3/480/480",
      creator: "0x4a2…c81f",
      owner: DEMO_WALLET,
      listed: false,
      priceEth: null,
    },
  ];
}
