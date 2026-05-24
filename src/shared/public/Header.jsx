import { Link } from "react-router-dom";
import { useSiteTheme } from "../../hooks/useSiteTheme";
import { useWallet } from "../../context/WalletContext";

const menuLinks = [
  { label: "Accueil", to: "/#hero" },
  { label: "Utilisateurs", to: "/#utilisateurs" },
  { label: "Créer & vendre", to: "/#creation" },
  { label: "NFTs en vente", to: "/#ventes" },
  { label: "Marketplace", to: "/nft" },
];

export function Header() {
  const { theme, toggleTheme } = useSiteTheme();
  const { connected, shortAccount } = useWallet();

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
          {menuLinks.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="font-medium no-underline"
              style={{ color: "var(--color-text-primary)" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">

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
            {connected ? shortAccount : "Wallet connect"}
          </Link>

        </div>
      </div>
    </nav>
  );
}