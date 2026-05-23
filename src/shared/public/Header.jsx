import { Link } from "react-router-dom";
import { useSiteTheme } from "../../hooks/useSiteTheme";

export function Header() {
  const { theme, toggleTheme } = useSiteTheme();

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
        <Link to="/" className="flex items-center gap-2 no-underline">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm">
            🔥
          </div>

          <span
            className="font-bold text-lg tracking-tight"
            style={{ color: "var(--color-text-primary)" }}
          >
            Axies
          </span>
        </Link>

        {/* Menu */}
        <div className="hidden lg:flex items-center gap-6">
          <Link
            to="/"
            className="font-medium no-underline"
            style={{ color: "var(--color-text-primary)" }}
          >
            Home
          </Link>
          <Link
            to="/nft"
            className="font-medium no-underline"
            style={{ color: "var(--color-text-primary)" }}
          >
            Marketplace NFT
          </Link>

          {["Explore", "Activity", "Community", "Pages", "Contact"].map((item) => (
            <div key={item} className="relative group">
              <button
                className="flex items-center gap-1 font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {item}
                <svg
                  className="w-3 h-3 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className="absolute top-8 left-0 hidden group-hover:block p-2 rounded-md shadow-lg"
                style={{
                  backgroundColor: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="px-3 py-2 text-sm cursor-pointer"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Item 1
                </div>
                <div
                  className="px-3 py-2 text-sm cursor-pointer"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Item 2
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

          <button
            style={{ color: "var(--color-text-secondary)" }}
          >
            🔍
          </button>

          {/* THEME TOGGLE */}
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-md border"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
          </button>

          <Link
            to="/login"
            className="px-4 py-2 text-xs rounded-md border no-underline"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
              backgroundColor: "transparent",
            }}
          >
            Wallet connect
          </Link>

        </div>
      </div>
    </nav>
  );
}