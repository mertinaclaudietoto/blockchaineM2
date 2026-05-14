export function SellerCard({ name, eth, emoji, gradient }) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[80px]  my-3 ">
      

      {/* AVATAR */}
      <div className="relative">

        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-gradient-to-br ${gradient}`}
          style={{
            boxShadow: "0 0 0 2px var(--color-primary)",
          }}
        >
          {emoji}
        </div>

        {/* BADGE */}
        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
          <svg
            className="w-2.5 h-2.5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

      </div>

      {/* NAME */}
      <p
        className="text-xs font-medium text-center"
        style={{ color: "var(--color-text-primary)" }}
      >
        {name}
      </p>

      {/* ETH */}
      <p
        className="text-xs"
        style={{ color: "var(--color-primary)" }}
      >
        {eth}
      </p>

    </div>
  );
}