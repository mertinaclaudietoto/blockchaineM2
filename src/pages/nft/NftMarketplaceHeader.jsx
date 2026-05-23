import { Link, useNavigate } from "react-router-dom";
import { useSiteTheme } from "../../hooks/useSiteTheme";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { useWallet } from "../../context/WalletContext";
import { DEMO_COLLECTION_NAME } from "../../seed/nftDemoData";

export function NftMarketplaceHeader() {
  const {
    ethBalance,
    displayWallet,
    displayChain,
    useChain,
    isSyncing,
    txPending,
  } = useNftMarketplace();
  const { connected, connect, isConnecting, shortAccount } = useWallet();
  const { theme, toggleTheme } = useSiteTheme();
  const navigate = useNavigate();

  const walletLabel = connected ? shortAccount : displayWallet;

  const onWalletClick = async () => {
    if (connected) {
      navigate("/login");
      return;
    }
    try {
      await connect();
    } catch {
      navigate("/login");
    }
  };

  return (
    <header
      className="nft-mp-header-bar sticky top-0 z-[100] border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-surface) 92%, transparent)",
        borderColor: "var(--color-border)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 h-[3.25rem] sm:h-14 flex items-center gap-3 sm:gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 shrink-0 no-underline rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
          title="Retour au site"
        >
          <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-violet-700 flex items-center justify-center text-xs sm:text-sm font-black text-white shadow-lg shadow-blue-900/25">
            A
          </span>
          <div className="hidden sm:block leading-tight">
            <span className="block text-sm font-bold tracking-tight" style={{ color: "var(--color-text-primary)" }}>
              Axies
            </span>
            <span
              className="block text-[10px] uppercase tracking-[0.12em] font-semibold"
              style={{ color: "var(--color-text-muted)" }}
            >
              {DEMO_COLLECTION_NAME}
            </span>
          </div>
        </Link>

        <div className="flex-1 max-w-xl hidden md:block">
          <div className="relative group">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-sm pointer-events-none transition-opacity group-focus-within:opacity-80"
              style={{ color: "var(--color-text-muted)" }}
              aria-hidden
            >
              ⌕
            </span>
            <input
              type="search"
              readOnly
              placeholder="Rechercher collections, wallets, items…"
              className="nft-mp-input w-full pl-9 pr-3 py-2 text-sm cursor-default"
              aria-label="Recherche (démo, non connectée)"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 ml-auto shrink-0">
          <span
            className="hidden lg:inline text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-lg font-bold nft-mp-header-chip"
            style={{
              backgroundColor: useChain
                ? "var(--color-blur-mint-soft)"
                : "var(--color-surface-elevated)",
              color: useChain ? "var(--color-blur-mint)" : "var(--color-text-secondary)",
              border: "1px solid var(--color-border)",
            }}
            title={useChain ? "Connecté à Sepolia" : "Mode démo locale"}
          >
            {displayChain}
            {isSyncing ? " · sync…" : ""}
            {txPending ? " · tx…" : ""}
          </span>
          <div
            className="nft-mp-header-wallet flex items-center gap-2 px-2.5 py-1.5 rounded-xl border nft-mp-header-chip"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface-elevated)",
            }}
            title={connected ? "Solde Sepolia" : "Solde (démo ou connectez le wallet)"}
          >
            <span className="text-xs font-bold" style={{ color: "var(--color-blur-mint)" }}>
              Ξ
            </span>
            <span className="nft-mp-price-mono text-sm tabular-nums" style={{ color: "var(--color-text-primary)" }}>
              {ethBalance.toFixed(4)}
            </span>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className="px-2.5 sm:px-3 py-2 rounded-xl border text-xs font-semibold shrink-0 nft-mp-header-chip"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-surface)",
            }}
            title={theme === "dark" ? "Passer en thème clair" : "Passer en thème sombre"}
          >
            {theme === "dark" ? "🌙" : "☀️"}
          </button>
          <button
            type="button"
            onClick={onWalletClick}
            disabled={isConnecting}
            className="text-[11px] sm:text-xs font-semibold font-mono px-2.5 sm:px-3 py-2 rounded-xl border max-w-[100px] sm:max-w-[140px] truncate nft-mp-header-chip disabled:opacity-60"
            style={{
              borderColor: connected ? "var(--color-blur-mint-border)" : "var(--color-border)",
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-surface)",
            }}
            title={connected ? "Gérer la connexion" : "Connecter MetaMask"}
          >
            {isConnecting ? "…" : connected ? walletLabel : "Connect"}
          </button>
        </div>
      </div>
    </header>
  );
}
