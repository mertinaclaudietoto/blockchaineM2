import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWallet } from "../context/WalletContext";
import { formatTransactionError } from "../blockchain/errors";
import { hasInjectedWallet } from "../blockchain/wallet";

export function WalletLogin() {
  const navigate = useNavigate();
  const { connect, isConnecting, error, clearError, connected, shortAccount } =
    useWallet();
  const [localError, setLocalError] = useState(null);

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      desc: "Connexion via window.ethereum (Sepolia)",
      icon: "🦊",
      enabled: hasInjectedWallet(),
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      desc: "Bientôt disponible",
      icon: "🔗",
      enabled: false,
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      desc: "Bientôt disponible",
      icon: "🔵",
      enabled: false,
    },
  ];

  const onConnectMetaMask = async () => {
    setLocalError(null);
    clearError();
    if (!hasInjectedWallet()) {
      setLocalError("Installez MetaMask ou un wallet compatible EIP-1193.");
      return;
    }
    try {
      await connect();
      navigate("/nft", { replace: true });
    } catch (err) {
      setLocalError(formatTransactionError(err));
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div
        className="w-full max-w-md rounded-2xl border p-6 shadow-lg"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <h1
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          Connecter votre wallet
        </h1>

        <p
          className="text-sm text-center mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          MetaMask sur le réseau Sepolia pour acheter et lister des NFT on-chain.
        </p>

        {connected && (
          <p
            className="text-xs text-center mb-4 px-3 py-2 rounded-lg"
            style={{
              background: "var(--color-primary-soft)",
              color: "var(--color-text-primary)",
            }}
          >
            Déjà connecté : <span className="font-mono">{shortAccount}</span>
          </p>
        )}

        {displayError && (
          <p
            className="text-xs text-center mb-4 px-3 py-2 rounded-lg border"
            style={{
              borderColor: "var(--color-border)",
              color: "#f87171",
              background: "color-mix(in srgb, #ef4444 8%, transparent)",
            }}
            role="alert"
          >
            {displayError}
          </p>
        )}

        <div className="space-y-3">
          {wallets.map((w) => (
            <button
              key={w.id}
              type="button"
              disabled={!w.enabled || isConnecting}
              onClick={w.id === "metamask" ? onConnectMetaMask : undefined}
              className="w-full flex items-center gap-3 p-3 rounded-xl border transition disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:-translate-y-0.5"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{ background: "var(--color-primary-soft)" }}
              >
                {w.icon}
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-sm">{w.name}</p>
                <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  {w.desc}
                </p>
              </div>
              {w.id === "metamask" && isConnecting && (
                <span className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                  …
                </span>
              )}
            </button>
          ))}
        </div>

        <p
          className="text-xs text-center mt-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Link to="/nft" className="underline">
            Continuer en mode démo
          </Link>{" "}
          sans wallet
        </p>
      </div>
    </div>
  );
}
