import { Link } from "react-router-dom";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { formatEth } from "../../utils/formatEth";
import { DEMO_COLLECTION_NAME } from "../../seed/nftDemoData";
import { NftCard } from "./NftCard";

export function NftCollection() {
  const { myNfts, DEMO_WALLET, marketStats } = useNftMarketplace();
  const listedMine = myNfts.filter((n) => n.listed);

  return (
    <main className="max-w-[1400px] mx-auto px-0 pb-10">
      <div className="nft-mp-hero-gradient border-b" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10 sm:py-12 flex flex-col sm:flex-row gap-6 sm:items-end">
          <div className="w-24 h-24 rounded-2xl border-4 shrink-0 overflow-hidden" style={{ borderColor: "var(--color-border)" }}>
            <img src="https://picsum.photos/seed/profilecol/200/200" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold truncate" style={{ color: "var(--color-text-primary)" }}>
              Portfolio
            </h1>
            <p className="text-sm mt-1 font-mono truncate" style={{ color: "var(--color-text-secondary)" }}>
              {DEMO_WALLET}
            </p>
            <p className="text-xs mt-2" style={{ color: "var(--color-text-secondary)" }}>
              {DEMO_COLLECTION_NAME} · {myNfts.length} NFT
              {listedMine.length > 0
                ? ` · ${listedMine.length} listing${listedMine.length > 1 ? "s" : ""}`
                : ""}
            </p>
          </div>
          <div className="flex gap-3 shrink-0">
            <div className="nft-mp-stat text-center min-w-[100px]">
              <p className="text-[10px] uppercase font-bold tracking-wide" style={{ color: "var(--color-text-muted)" }}>
                Floor coll.
              </p>
              <p className="nft-mp-price-mono text-sm font-bold mt-1" style={{ color: "var(--color-text-primary)" }}>
                {marketStats.floorEth != null ? formatEth(marketStats.floorEth) : "—"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 pt-8 space-y-6">
        {myNfts.length === 0 ? (
          <div className="nft-mp-empty max-w-lg mx-auto">
            <div className="nft-mp-empty-icon" aria-hidden>
              ◇
            </div>
            <p className="font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
              Portfolio vide
            </p>
            <p>Achetez sur le marché ou mintez un nouveau token.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <Link to="/nft/mint" className="nft-mp-btn nft-mp-btn-primary text-sm px-5">
                Mint
              </Link>
              <Link to="/nft/explorer" className="nft-mp-btn nft-mp-btn-ghost text-sm px-5">
                Explorer
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {myNfts.map((nft) => (
              <NftCard key={nft.tokenId} nft={nft} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
