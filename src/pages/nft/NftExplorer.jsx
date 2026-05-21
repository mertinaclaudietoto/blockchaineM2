import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { formatEth } from "../../utils/formatEth";
import { DEMO_COLLECTION_NAME } from "../../seed/nftDemoData";
import { NftCard } from "./NftCard";

export function NftExplorer() {
  const { nfts, listedNfts, marketStats } = useNftMarketplace();
  const [mode, setMode] = useState("all");
  const [view, setView] = useState("grid");

  const visible = useMemo(
    () => (mode === "listed" ? listedNfts : nfts),
    [mode, listedNfts, nfts]
  );

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div className="space-y-2 max-w-2xl">
          <p className="nft-mp-page-eyebrow">{DEMO_COLLECTION_NAME}</p>
          <h1 className="nft-mp-page-title">Explorer le marché</h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Basculez entre une grille visuelle (type vitrine) et une table dense (type terminal trader).
          </p>
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <div className="nft-mp-segment nft-mp-segment--primary" role="group" aria-label="Filtrer">
            {[
              { id: "all", label: "Tous" },
              { id: "listed", label: "Listés" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setMode(t.id)}
                className={`nft-mp-segment-btn ${mode === t.id ? "is-active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="nft-mp-segment nft-mp-segment--blur" role="group" aria-label="Vue">
            {[
              { id: "grid", label: "Grille" },
              { id: "table", label: "Table" },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setView(t.id)}
                className={`nft-mp-segment-btn ${view === t.id ? "is-active" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="nft-mp-chip nft-mp-chip-mono">
          Floor <span style={{ color: "var(--color-blur-mint)" }}>{marketStats.floorEth != null ? formatEth(marketStats.floorEth) : "—"}</span>
        </span>
        <span className="nft-mp-chip">
          {visible.length} résultat{visible.length > 1 ? "s" : ""}
        </span>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
          {visible.map((nft) => (
            <NftCard key={nft.tokenId} nft={nft} showOwner />
          ))}
        </div>
      ) : (
        <div className="nft-mp-table-wrap overflow-x-auto">
          <table className="nft-mp-table min-w-[640px]">
            <thead>
              <tr>
                <th>Item</th>
                <th>Prix</th>
                <th>Propriétaire</th>
                <th>Statut</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((nft) => (
                <tr key={nft.tokenId}>
                  <td>
                    <Link to={`/nft/token/${nft.tokenId}`} className="flex items-center gap-3 no-underline group">
                      <img
                        src={nft.imageUrl}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover border transition-transform group-hover:scale-105"
                        style={{ borderColor: "var(--color-border)" }}
                      />
                      <div>
                        <span
                          className="font-semibold text-sm block group-hover:underline decoration-2 underline-offset-2"
                          style={{ color: "var(--color-text-primary)" }}
                        >
                          {nft.name}
                        </span>
                        <span className="text-[11px] font-mono" style={{ color: "var(--color-text-muted)" }}>
                          #{nft.tokenId}
                        </span>
                      </div>
                    </Link>
                  </td>
                  <td>
                    <span className="nft-mp-price-mono" style={{ color: nft.listed ? "var(--color-blur-mint)" : "var(--color-text-muted)" }}>
                      {nft.listed ? formatEth(nft.priceEth) : "—"}
                    </span>
                  </td>
                  <td className="font-mono text-[11px] max-w-[140px] truncate" style={{ color: "var(--color-text-secondary)" }}>
                    {nft.owner}
                  </td>
                  <td>
                    <span
                      className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md tracking-wide"
                      style={{
                        backgroundColor: nft.listed ? "var(--color-blur-mint-soft)" : "var(--color-surface-elevated)",
                        color: nft.listed ? "var(--color-blur-mint)" : "var(--color-text-muted)",
                      }}
                    >
                      {nft.listed ? "Listé" : "Hors marché"}
                    </span>
                  </td>
                  <td className="text-right">
                    <Link to={`/nft/token/${nft.tokenId}`} className="nft-mp-link text-xs">
                      Trade →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
