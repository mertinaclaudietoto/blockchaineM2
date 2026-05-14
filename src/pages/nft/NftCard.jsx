import { Link } from "react-router-dom";
import { formatEth } from "../../utils/formatEth";

export function NftCard({ nft, showOwner }) {
  return (
    <Link
      to={`/nft/token/${nft.tokenId}`}
      className="nft-mp-card nft-mp-glow no-underline flex flex-col overflow-hidden group"
    >
      <div className="aspect-square overflow-hidden relative nft-mp-card-img nft-mp-card-img-bg">
        <img
          src={nft.imageUrl}
          alt=""
          className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.05]"
        />
        {nft.listed && (
          <span
            className="absolute top-2.5 right-2.5 text-[11px] font-bold px-2 py-1 rounded-lg nft-mp-price-mono z-[1]"
            style={{
              backgroundColor: "rgba(0,0,0,0.82)",
              color: "var(--color-blur-mint)",
              border: "1px solid var(--color-blur-mint-border)",
            }}
          >
            {formatEth(nft.priceEth)}
          </span>
        )}
        <div className="nft-mp-card-overlay">
          <span className="nft-mp-card-cta">Voir le NFT</span>
        </div>
      </div>
      <div className="p-3.5 flex flex-col gap-1 flex-1 border-t" style={{ borderColor: "var(--color-border)" }}>
        <span className="font-semibold text-sm leading-snug line-clamp-1" style={{ color: "var(--color-text-primary)" }}>
          {nft.name}
        </span>
        <span className="text-[11px] font-medium" style={{ color: "var(--color-text-muted)" }}>
          #{nft.tokenId}
          {nft.listed ? (
            <span style={{ color: "var(--color-blur-mint-dim)" }}> · Buy now</span>
          ) : (
            <span> · Hors marché</span>
          )}
        </span>
        {showOwner && (
          <span className="text-[10px] font-mono truncate mt-0.5 opacity-85" style={{ color: "var(--color-text-secondary)" }}>
            {nft.owner}
          </span>
        )}
      </div>
    </Link>
  );
}
