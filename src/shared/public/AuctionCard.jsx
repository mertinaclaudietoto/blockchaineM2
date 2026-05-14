export function AuctionCard({
  emoji,
  likes,
  timer,
  title,
  blockchain,
  author,
  price,
  avatar,
  accent = "primary",
  showBidButton = false,
}) {
  const accentMap = {
    primary: "bg-primary",
    success: "bg-success",
    danger: "bg-danger",
  };

  return (
    <div className="overflow-hidden rounded-xl border bg-surface border-border transition hover:-translate-y-1 hover:shadow-lg">

      {/* IMAGE */}
      <div className="relative">

        <div
          className="w-full aspect-square flex items-center justify-center text-8xl"
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary-soft), transparent)",
          }}
        >
          {emoji}
        </div>

        {/* likes */}
        <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full bg-surface/80">
          ❤️ {likes}
        </span>

        {/* timer */}
        <span className="absolute bottom-3 left-3 text-xs px-2 py-1 rounded-md bg-surface/80 text-[var(--color-text-secondary)]">
          ⏱ {timer}
        </span>

        {/* bid button optional */}
        {showBidButton && (
          <button className="absolute inset-0 m-auto h-9 px-4 rounded-full text-xs font-semibold bg-white/90 text-black">
            Place Bid
          </button>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4">

        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold truncate text-[var(--color-text-primary)]">
            {title}
          </p>

          <span className="text-xs px-2 py-1 rounded-md border border-border text-[var(--color-text-secondary)]">
            {blockchain}
          </span>
        </div>

        <div className="flex items-center justify-between">

          {/* author */}
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs text-white ${accentMap[accent]}`}
            >
              {avatar}
            </div>

            <span className="text-xs text-[var(--color-text-secondary)]">
              {author}
            </span>
          </div>

          {/* price */}
          <div className="text-right">
            <p className="text-xs text-[var(--color-text-secondary)]">
              Current Bid
            </p>
            <p className="text-sm font-bold text-[var(--color-text-primary)]">
              {price} ETH
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}