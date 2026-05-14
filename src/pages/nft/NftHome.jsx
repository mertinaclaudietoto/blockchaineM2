import { Link } from "react-router-dom";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { formatEth } from "../../utils/formatEth";
import { DEMO_COLLECTION_NAME } from "../../seed/nftDemoData";
import { NftCard } from "./NftCard";

function StatPill({ label, value, hint }) {
  return (
    <div className="nft-mp-stat flex-1 sm:flex-none min-w-[92px] sm:min-w-[100px]">
      <p className="text-[10px] uppercase tracking-[0.12em] font-bold mb-1" style={{ color: "var(--color-text-muted)" }}>
        {label}
      </p>
      <p className="nft-mp-price-mono text-base sm:text-lg" style={{ color: "var(--color-text-primary)" }}>
        {value}
      </p>
      {hint ? (
        <p className="text-[10px] mt-1 leading-snug" style={{ color: "var(--color-text-muted)" }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function NftHome() {
  const { listedNfts, myNfts, marketStats } = useNftMarketplace();

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
      <section className="nft-mp-hero-gradient rounded-2xl border overflow-hidden nft-mp-glow" style={{ borderColor: "var(--color-border)" }}>
        <div className="nft-mp-hero-inner px-6 sm:px-10 py-10 sm:py-14 grid lg:grid-cols-[1.15fr_1fr] gap-10 items-center">
          <div className="space-y-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--color-blur-mint)" }}>
              Collection · marketplace
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.35rem] font-extrabold tracking-tight leading-[1.1]" style={{ color: "var(--color-text-primary)" }}>
              {DEMO_COLLECTION_NAME}
            </h1>
            <p className="text-sm sm:text-[0.95rem] max-w-lg leading-relaxed nft-mp-hero-lead">
              Floor, listings et grille « Buy now » dans un thème unifié. Simulation locale : idéal pour présenter le parcours
              utilisateur sans backend.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link to="/nft/explorer" className="nft-mp-btn nft-mp-btn-primary rounded-xl px-6">
                Parcourir les NFT
              </Link>
              <Link to="/nft/mint" className="nft-mp-btn nft-mp-btn-ghost rounded-xl px-6">
                Mint
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
            <StatPill
              label="Floor"
              value={marketStats.floorEth != null ? formatEth(marketStats.floorEth) : "—"}
              hint="Plus bas prix listé"
            />
            <StatPill label="Listings" value={String(marketStats.listings)} hint="En vente" />
            <StatPill label="Items" value={String(marketStats.items)} hint="Supply démo" />
            <StatPill label="Owners" value={String(marketStats.uniqueOwners)} hint="Wallets" />
          </div>
        </div>
      </section>

      <section className="flex flex-wrap items-end justify-between gap-4 border-b pb-4" style={{ borderColor: "var(--color-border)" }}>
        <div>
          <p className="nft-mp-page-eyebrow mb-1">Marché secondaire</p>
          <h2 className="nft-mp-page-title">Tendance · Buy now</h2>
          <p className="text-sm mt-1.5" style={{ color: "var(--color-text-secondary)" }}>
            {myNfts.length} NFT dans votre portfolio
          </p>
        </div>
        <Link to="/nft/explorer" className="nft-mp-link">
          Voir tout
        </Link>
      </section>

      {listedNfts.length === 0 ? (
        <div className="nft-mp-empty max-w-lg mx-auto">
          <div className="nft-mp-empty-icon" aria-hidden>
            ◈
          </div>
          <p className="font-semibold mb-1" style={{ color: "var(--color-text-primary)" }}>
            Aucune offre « Buy now »
          </p>
          <p>
            Mintez un token, ouvrez sa fiche puis fixez un prix en ETH pour l’afficher ici.
          </p>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {listedNfts.slice(0, 10).map((nft) => (
            <NftCard key={nft.tokenId} nft={nft} />
          ))}
        </div>
      )}
    </main>
  );
}
