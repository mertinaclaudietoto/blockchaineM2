import { Link } from "react-router-dom";

export function PickCard({
  title,
  description,
  emoji,
  bg,
  imageUrl,
  creator,
  seller,
  eth,
  badge,
  tokenId,
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface hover:-translate-y-1 transition">

      {/* IMAGE */}
      <div className="relative">

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full aspect-square object-cover"
          />
        ) : (
          <div
            className="w-full aspect-square flex items-center justify-center text-8xl"
            style={{ background: bg }}
          >
            {emoji}
          </div>
        )}

        <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-surface/80 text-[var(--color-text-primary)]">
          #{tokenId}
        </span>

        {/* BADGE */}
        {badge && (
          <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-primary text-white">
            {badge}
          </span>
        )}

      </div>

      {/* CONTENT */}
      <div className="p-4">

        <div className="flex items-center justify-between mb-2">

          <p className="text-sm font-semibold truncate text-[var(--color-text-primary)]">
            {title}
          </p>

          <span className="text-xs px-2 py-1 rounded-md border border-border text-[var(--color-text-secondary)]">
            ERC-721
          </span>

        </div>

        {description && (
          <p className="text-xs mb-3 line-clamp-2 min-h-[2rem] text-[var(--color-text-secondary)]">
            {description}
          </p>
        )}

        <div className="space-y-2 mb-3">

          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-text-secondary)]">
              Créateur
            </span>
            <span className="text-[11px] font-mono truncate text-[var(--color-text-primary)]">
              {creator}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-[var(--color-text-secondary)]">
              Vendeur
            </span>
            <span className="text-[11px] font-mono truncate text-[var(--color-text-primary)]">
              {seller}
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 pt-1">
            <span className="text-[11px] text-[var(--color-text-secondary)]">
              Prix
            </span>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">
              {eth}
            </p>
          </div>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">

          <Link
            to={`/nft/token/${tokenId}`}
            className="flex-1 py-2 text-xs rounded-md bg-primary text-white hover:bg-primary-hover transition text-center no-underline"
          >
            Voir / Acheter
          </Link>

          <Link
            to="/nft/explorer"
            className="flex-1 py-2 text-xs rounded-md border border-border hover:bg-surface transition text-[var(--color-text-primary)] text-center no-underline"
          >
            Explorer
          </Link>

        </div>

      </div>
    </div>
  );
}