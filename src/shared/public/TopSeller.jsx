import { useMemo } from "react";
import { SellerCard } from "./SellerCard";
import { sellers } from "../../seed/data";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { shortenAddress } from "../../blockchain/wallet";

const gradients = [
  "from-yellow-400 to-orange-400",
  "from-teal-400 to-green-500",
  "from-pink-400 to-purple-500",
  "from-indigo-400 to-blue-500",
  "from-green-400 to-lime-400",
  "from-rose-400 to-red-500",
];

function buildMarketplaceUsers(nfts, walletAddress) {
  const users = new Map();

  const ensureUser = (address) => {
    if (!address) return null;
    const key = address.toLowerCase();
    if (!users.has(key)) {
      users.set(key, {
        address,
        owned: 0,
        listed: 0,
      });
    }
    return users.get(key);
  };

  nfts.forEach((nft) => {
    const owner = ensureUser(nft.owner);
    if (owner) {
      owner.owned += 1;
      if (nft.listed) owner.listed += 1;
    }

    ensureUser(nft.creator);
  });

  ensureUser(walletAddress);

  return Array.from(users.values())
    .sort((a, b) => b.listed - a.listed || b.owned - a.owned)
    .map((user, index) => ({
      name: shortenAddress(user.address),
      eth: `${user.owned} NFT${user.owned > 1 ? "s" : ""}${
        user.listed ? ` · ${user.listed} listé${user.listed > 1 ? "s" : ""}` : ""
      }`,
      emoji: String(index + 1),
      gradient: gradients[index % gradients.length],
    }));
}

export function TopSeller() {
  const { nfts, walletAddress, useChain, isSyncing } = useNftMarketplace();
  const marketplaceUsers = useMemo(
    () => buildMarketplaceUsers(nfts, walletAddress),
    [nfts, walletAddress]
  );
  const visibleSellers = marketplaceUsers.length > 0 ? marketplaceUsers : sellers;

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-7">
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Utilisateurs marketplace
          </h2>
          <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
            {marketplaceUsers.length} wallet{marketplaceUsers.length > 1 ? "s" : ""} détecté
            {marketplaceUsers.length > 1 ? "s" : ""} depuis les NFTs
            {useChain ? " on-chain" : " en mode démo"}
            {isSyncing ? " · synchronisation…" : ""}
          </p>
        </div>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-border text-[var(--color-text-primary)] hover:bg-surface transition">
            ‹
          </button>

          <button className="w-8 h-8 rounded-full bg-primary text-white">
            ›
          </button>
        </div>
      </div>

      {/* SCROLL ROW */}
      <div className="flex gap-5 overflow-x-auto pb-2 " >
        {visibleSellers.map((seller, i) => (
          <SellerCard key={i} {...seller} />
        ))}
      </div>
    </section>
  );
}