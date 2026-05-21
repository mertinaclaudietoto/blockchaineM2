import { Link } from "react-router-dom";

export function NftMarketplaceFooter() {
  return (
    <footer
      className="border-t mt-auto py-7"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "color-mix(in srgb, var(--color-surface) 96%, var(--color-background) 4%)",
      }}
    >
      <div
        className="max-w-[1400px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs"
        style={{ color: "var(--color-text-muted)" }}
      >
        <p className="text-center sm:text-left max-w-md leading-relaxed">
          Démo UX marketplace (thème sombre type OpenSea / Blur) — aucune transaction sur la chaîne.
        </p>
        <div className="flex flex-wrap justify-center gap-5">
          <Link to="/nft/explorer" className="nft-mp-footer-link nft-mp-footer-link--accent">
            Explorer
          </Link>
          <Link to="/nft/mint" className="nft-mp-footer-link">
            Mint
          </Link>
          <Link to="/" className="nft-mp-footer-link">
            Site principal
          </Link>
        </div>
      </div>
    </footer>
  );
}
