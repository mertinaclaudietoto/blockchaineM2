export function WalletLogin() {
  const wallets = [
    {
      name: "MetaMask",
      desc: "Connect using browser wallet",
      icon: "🦊",
    },
    {
      name: "WalletConnect",
      desc: "Scan with mobile app",
      icon: "🔗",
    },
    {
      name: "Coinbase Wallet",
      desc: "Connect with Coinbase",
      icon: "🔵",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-6">

      {/* CARD */}
      <div
        className="w-full max-w-md rounded-2xl border p-6 shadow-lg"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >

        {/* TITLE */}
        <h1
          className="text-2xl font-bold mb-2 text-center"
          style={{ color: "var(--color-text-primary)" }}
        >
          Connect Your Wallet
        </h1>

        <p
          className="text-sm text-center mb-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Choose a wallet to continue exploring NFTs
        </p>

        {/* WALLETS */}
        <div className="space-y-3">

          {wallets.map((w, i) => (
            <button
              key={i}
              className="w-full flex items-center gap-3 p-3 rounded-xl border transition hover:-translate-y-0.5 hover:bg-surface"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            >

              {/* ICON */}
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                style={{
                  background: "var(--color-primary-soft)",
                }}
              >
                {w.icon}
              </div>

              {/* TEXT */}
              <div className="text-left">
                <p className="font-semibold text-sm">{w.name}</p>
                <p
                  className="text-xs"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {w.desc}
                </p>
              </div>

            </button>
          ))}

        </div>

        {/* FOOT NOTE */}
        <p
          className="text-xs text-center mt-6"
          style={{ color: "var(--color-text-secondary)" }}
        >
          By connecting, you agree to our Terms of Service
        </p>

      </div>

    </div>
  );
}