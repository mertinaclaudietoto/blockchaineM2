export function PickCard({ title, emoji, bg, owner, eth, heart, badge }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface hover:-translate-y-1 transition">

      {/* IMAGE */}
      <div className="relative">

        <div
          className="w-full aspect-square flex items-center justify-center text-8xl"
          style={{ background: bg }}
        >
          {emoji}
        </div>

        {/* HEART */}
        <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-surface/80">
          ❤️ {heart}
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
            BSC
          </span>

        </div>

        <div className="flex items-center justify-between mb-3">

          {/* OWNER */}
          <div className="flex items-center gap-2">

            <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs bg-primary text-white">
              🎨
            </div>

            <span className="text-xs text-[var(--color-text-secondary)]">
              {owner}
            </span>

          </div>

          {/* PRICE */}
          <p className="text-sm font-bold text-[var(--color-text-primary)]">
            {eth}
          </p>

        </div>

        {/* ACTIONS */}
        <div className="flex gap-2">

          <button className="flex-1 py-2 text-xs rounded-md bg-primary text-white hover:bg-primary-hover transition">
            🔨 Place Bid
          </button>

          <button className="flex-1 py-2 text-xs rounded-md border border-border hover:bg-surface transition text-[var(--color-text-primary)]">
            ↺ History
          </button>

        </div>

      </div>
    </div>
  );
}