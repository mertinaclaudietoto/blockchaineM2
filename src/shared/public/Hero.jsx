export function Hero() {
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
          <h1
            className="text-5xl lg:text-6xl font-extrabold leading-tight mb-3"
            style={{ color: "var(--color-text-primary)" }}
          >
            Discover, find,<br />
            <span className="text-primary">Sell extraordinary</span><br />
            Monster NFTs
          </h1>

          <p
            className="text-sm mt-4 mb-8 max-w-sm leading-relaxed"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Marketplace For Monster Character Collections Non Fungible Token NFTs
          </p>

          <div className="flex items-center gap-3">
            <button
              className="px-5 py-2 rounded-md font-medium transition bg-primary hover:bg-primary-hover text-white"
            >
              🔍 Explore
            </button>

            <button
              className="px-5 py-2 rounded-md border transition border-border text-text-primary hover:bg-surface"
            >
              ✏️ Create
            </button>
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
              <div className="text-8xl">🐙</div>

              {/* BADGE */}
              <div
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-surface/80 dark:bg-white/10"
                style={{
                  color: "var(--color-text-primary)",
                }}
              >
                31
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}