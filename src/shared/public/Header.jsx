export function Header() {
  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
        backdropFilter: "blur(16px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
            🔥
          </div>

          <span
            className="font-bold text-lg tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            Axies
          </span>
        </div>

        {/* Menu */}
        <div className="hidden lg:flex items-center gap-6">

          <a
            href="#"
            className="nav-link font-medium"
            style={{ color: "var(--color-text-primary)" }}
          >
            Home
          </a>

          {["Explore", "Activity", "Community", "Pages", "Contact"].map((item) => (
            <div key={item} className="relative group">
              <button
                className="nav-link flex items-center gap-1 font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {item}
                <svg className="w-3 h-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* dropdown (simple style) */}
              <div
                className="absolute top-8 left-0 hidden group-hover:block p-2 rounded-md shadow-lg"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div className="px-3 py-2 text-sm cursor-pointer" style={{ color: "var(--color-text-secondary)" }}>
                  Item 1
                </div>
                <div className="px-3 py-2 text-sm cursor-pointer" style={{ color: "var(--color-text-secondary)" }}>
                  Item 2
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          <button
            className="transition-colors"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          <button
            className="px-4 py-2 text-xs rounded-md border"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
              backgroundColor: "transparent",
            }}
          >
            Wallet connect
          </button>

        </div>

      </div>
    </nav>
  );
}