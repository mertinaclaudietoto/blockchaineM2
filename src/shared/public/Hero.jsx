import { Link } from "react-router-dom";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { formatEth } from "../../utils/formatEth";

export function Hero() {
  const { listedNfts, marketStats, salesStats, useChain, isSyncing } =
    useNftMarketplace();
  const featuredNft = listedNfts[0];
  const stats = [
    { label: "Ventes confirmées", value: String(salesStats.sales) },
    { label: "Volume échangé", value: formatEth(salesStats.volumeEth) },
    { label: "NFTs mintés", value: String(marketStats.items) },
    { label: "Utilisateurs", value: String(marketStats.uniqueOwners) },
  ];

  return (
    <section className="relative overflow-hidden min-h-[560px] flex items-center">

      {/* BACKGROUND GRADIENT THEME-AWARE */}
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{
          background:
            "linear-gradient(135deg, var(--color-background) 0%, var(--color-primary-soft) 50%, var(--color-background) 100%)",
        }}
      />

      {/* GLOW ORBS (LIGHT/DARK SAFE) */}
      <div className="absolute w-96 h-96 -top-20 right-20 rounded-full blur-3xl bg-primary/20 dark:bg-primary/30" />
      <div className="absolute w-64 h-64 bottom-0 right-1/3 rounded-full blur-3xl bg-primary/10 dark:bg-primary/20" />

      {/* DECORATIVE DOTS */}
      <div className="absolute top-1/4 right-1/4 w-3 h-3 rounded-full bg-primary opacity-60" />
      <div className="absolute top-1/3 right-2/5 w-2 h-2 rounded-full bg-primary opacity-40" />
      <div className="absolute bottom-1/4 right-1/3 w-4 h-4 rounded-full border border-primary opacity-30" />

      {/* ORBIT RING */}
      <div className="absolute right-32 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-border/50 border-dashed" />

      {/* CONTENT */}
      <div className="relative max-w-7xl mx-auto px-6 py-20 w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* LEFT TEXT */}
        <div>
          <p
            className="text-xs font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: "var(--color-primary)" }}
          >
            Marketplace NFT ERC-721 {useChain ? "connectée à Sepolia" : "en mode démo"}
            {isSyncing ? " · synchronisation…" : ""}
          </p>
          <h1
            className="text-5xl lg:text-6xl font-extrabold leading-tight mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Créez, listez,<br />
            <span className="text-primary">vendez et achetez</span><br />
            vos NFTs
          </h1>

          <p
            className="text-sm mt-4 mb-8 max-w-xl leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Une marketplace décentralisée où chaque NFT est minté sur le smart contract,
            listé en ETH, puis transféré automatiquement à l’acheteur après paiement.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 max-w-2xl">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border px-3 py-3"
                style={{
                  borderColor: "var(--color-border)",
                  backgroundColor: "var(--color-surface)",
                }}
              >
                <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                  {stat.value}
                </p>
                <p className="text-[11px] mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Link
              to="/nft/explorer"
              className="px-5 py-2 rounded-md font-medium transition bg-primary hover:bg-primary-hover text-white no-underline"
            >
              Explorer le marché
            </Link>

            <Link
              to="/nft/mint"
              className="px-5 py-2 rounded-md border transition border-border text-text-primary hover:bg-surface no-underline"
            >
              Créer un NFT
            </Link>
          </div>
        </div>

        {/* RIGHT NFT VISUAL */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative animate-bounce">

            {/* GLOW */}
            <div
              className="absolute inset-0 rounded-3xl blur-3xl opacity-40"
              style={{
                background: "radial-gradient(circle, var(--color-primary), transparent)",
              }}
            />

            {/* NFT CARD */}
            <div
              className="relative w-64 h-72 rounded-3xl flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary-soft), transparent)",
                border: "1px solid var(--color-border)",
              }}
            >
              {featuredNft?.imageUrl ? (
                <img
                  src={featuredNft.imageUrl}
                  alt={featuredNft.name}
                  className="w-full h-full object-cover rounded-3xl"
                />
              ) : (
                <div className="text-8xl">🐙</div>
              )}

              {/* BADGE */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-surface/80 dark:bg-white/10"
                style={{
                  color: "var(--color-text-primary)",
                }}
              >
                {marketStats.listings}
              </div>

              {featuredNft && (
                <div
                  className="absolute left-4 right-4 bottom-4 rounded-2xl p-3 border"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--color-surface) 88%, transparent)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  <p className="text-xs font-bold truncate">{featuredNft.name}</p>
                  <p className="text-[11px] mt-1" style={{ color: "var(--color-text-secondary)" }}>
                    En vente · {formatEth(featuredNft.priceEth)}
                  </p>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}