import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PickCard } from "./PickCard";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { shortenAddress } from "../../blockchain/wallet";
import { formatEth } from "../../utils/formatEth";

const PAGE_SIZE = 8;

function truncateText(text, max = 90) {
  if (!text) return "NFT créé sur le marketplace, disponible à la vente.";
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function TodaysPicks() {
  const { listedNfts, useChain, isSyncing } = useNftMarketplace();
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loadMoreRef = useRef(null);

  const salePicks = useMemo(
    () =>
      listedNfts.map((nft) => ({
        tokenId: nft.tokenId,
        title: nft.name || `NFT #${nft.tokenId}`,
        description: truncateText(nft.description),
        imageUrl: nft.imageUrl,
        creator: shortenAddress(nft.creator),
        seller: shortenAddress(nft.owner),
        eth: formatEth(nft.priceEth),
        badge: useChain ? "Sepolia" : "Démo",
      })),
    [listedNfts, useChain]
  );
  const visiblePicks = salePicks.slice(0, visibleCount);
  const hasMore = visibleCount < salePicks.length;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [salePicks.length]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !hasMore) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) =>
            Math.min(count + PAGE_SIZE, salePicks.length)
          );
        }
      },
      { rootMargin: "240px" }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, salePicks.length]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
            NFTs disponibles à la vente
          </h2>
          <p className="text-sm mt-1 text-[var(--color-text-secondary)]">
            {salePicks.length} NFT{salePicks.length > 1 ? "s" : ""} listé
            {salePicks.length > 1 ? "s" : ""} {useChain ? "depuis la blockchain" : "en mode démo"}
            {isSyncing ? " · synchronisation…" : ""}
          </p>
        </div>

        <Link
          to="/nft/explorer"
          className="text-sm font-semibold text-[var(--color-primary)] hover:opacity-70 transition"
        >
          EXPLORE MORE
        </Link>

      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

        <div className="flex flex-wrap gap-2">
          {["En vente", "Prix ETH", "ERC-721", useChain ? "Sepolia" : "Démo"].map((f, i) => (
            <button
              key={i}
              className="px-3 py-1 rounded-full border border-border text-sm hover:bg-surface transition text-[var(--color-text-primary)]"
            >
              {f}
            </button>
          ))}
        </div>

        <button className="px-3 py-1 rounded-full border border-border text-sm hover:bg-surface transition text-[var(--color-text-primary)]">
          ⇅ Sort By: Recently Added
        </button>

      </div>

      {/* GRID */}
      {salePicks.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {visiblePicks.map((item) => (
              <PickCard key={item.tokenId} {...item} />
            ))}
          </div>

          <div
            ref={loadMoreRef}
            className="flex justify-center mt-8 text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {hasMore
              ? "Chargement des NFTs suivants…"
              : "Tous les NFTs disponibles à la vente sont affichés."}
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <p className="font-semibold text-[var(--color-text-primary)]">
            Aucun NFT n’est listé pour le moment.
          </p>
          <p className="text-sm mt-2 text-[var(--color-text-secondary)]">
            Mint un NFT, ouvre sa page détail, puis clique sur “Lister pour de l’ETH”.
          </p>
        </div>
      )}

      {/* LOAD MORE */}
      <div className="flex justify-center mt-10">
        <Link
          to="/nft/explorer"
          className="px-8 py-3 rounded-md border border-border hover:bg-surface transition text-[var(--color-text-primary)] no-underline"
        >
          Voir le marketplace
        </Link>
      </div>

    </section>
  );
}