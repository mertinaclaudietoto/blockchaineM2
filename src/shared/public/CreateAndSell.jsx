import { useNavigate } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";

const steps = [
  {
    title: "Connecter le wallet",
    desc: "Connectez MetaMask et vérifiez que vous êtes sur le réseau Sepolia avant d’utiliser le marketplace.",
    action: "Se connecter",
    to: "/nft",
    emoji: "💳",
    bg: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    soft: "rgba(99,102,241,0.15)",
  },
  {
    title: "Créer un NFT",
    desc: "Ajoutez un nom, une description et une image, puis mintez votre NFT ERC-721 sur le smart contract.",
    action: "Minter un NFT",
    to: "/nft/mint",
    emoji: "🖼️",
    bg: "linear-gradient(135deg, #f59e0b, #d97706)",
    soft: "rgba(245,158,11,0.15)",
  },
  {
    title: "Lister pour la vente",
    desc: "Ouvrez votre collection, choisissez un NFT que vous possédez et définissez son prix en ETH.",
    action: "Voir ma collection",
    to: "/nft/collection",
    emoji: "🏷️",
    bg: "linear-gradient(135deg, #ef4444, #dc2626)",
    soft: "rgba(239,68,68,0.15)",
  },
  {
    title: "Acheter un NFT",
    desc: "Explorez les NFTs disponibles à la vente et confirmez l’achat avec MetaMask.",
    action: "Explorer le marché",
    to: "/nft/explorer",
    emoji: "🛒",
    bg: "linear-gradient(135deg, #10b981, #059669)",
    soft: "rgba(16,185,129,0.15)",
  },
];

export function CreateAndSell() {
  const navigate = useNavigate();
  const { connected } = useWallet();

  const goToStep = (to) => {
    navigate(connected ? to : "/login");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      {/* TITLE */}
      <h2
        className="text-2xl font-bold mb-10"
        style={{ color: "var(--color-text-primary)" }}
      >
        Créer, vendre et acheter vos NFTs
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {steps.map((step) => (
          <div key={step.title}>

            {/* ICON WRAPPER */}
            <div
              className="mb-4 w-fit p-3 rounded-2xl"
              style={{ background: step.soft }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: step.bg }}
              >
                {step.emoji}
              </div>
            </div>

            {/* TITLE */}
            <h3
              className="font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              {step.title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {step.desc}
            </p>

            <button
              type="button"
              onClick={() => goToStep(step.to)}
              className="mt-4 px-4 py-2 rounded-md text-xs font-semibold border transition hover:bg-surface"
              style={{
                color: "var(--color-text-primary)",
                borderColor: "var(--color-border)",
              }}
            >
              {connected ? step.action : "Connectez-vous d’abord"}
            </button>

          </div>
        ))}

      </div>
    </section>
  );
}