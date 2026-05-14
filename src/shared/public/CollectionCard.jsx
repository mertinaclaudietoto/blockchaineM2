export function CollectionCard({ title, owner, emoji, main, grid, gradient, bgMain, bg1, bg2 }) {
  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden hover:-translate-y-1 transition">

      {/* HEADER CARD */}
      <div className="p-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-lg bg-gradient-to-br ${gradient}`}
            style={{
              boxShadow: "0 0 0 2px var(--color-primary)",
            }}
          >
            {emoji}
          </div>

          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
              {title}
            </p>

            <p className="text-xs text-[var(--color-text-secondary)]">
              {owner}
            </p>
          </div>

        </div>

        <span className="text-xs px-2 py-1 rounded-full bg-surface/80 text-[var(--color-text-primary)]">
          ❤️ 100
        </span>

      </div>

      {/* GRID IMAGES */}
      <div className="grid grid-cols-3 gap-1 px-4 pb-4">

        {/* MAIN */}
        <div
          className="col-span-2 row-span-2 aspect-square rounded-lg flex items-center justify-center text-5xl"
          style={{ background: bgMain }}
        >
          {main}
        </div>

        {/* GRID 1 */}
        <div
          className="aspect-square rounded-lg flex items-center justify-center text-2xl"
          style={{ background: bg1 }}
        >
          {grid[0]}
        </div>

        {/* GRID 2 */}
        <div
          className="aspect-square rounded-lg flex items-center justify-center text-2xl"
          style={{ background: bg2 }}
        >
          {grid[1]}
        </div>

      </div>
    </div>
  );
}