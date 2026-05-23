import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { DEMO_COLLECTION_NAME } from "../../seed/nftDemoData";

const field = "nft-mp-input w-full mt-1.5 px-3 py-2.5 text-sm rounded-xl";

export function NftMint() {
  const { mint, displayContract, useChain, txPending } = useNftMarketplace();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const tokenId = await mint({ name, description, imageUrl });
    if (tokenId != null) {
      navigate(`/nft/token/${tokenId}`, { replace: true });
    }
  };

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-10">
      <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-10 items-start">
        <div className="lg:col-span-2 space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--color-blur-mint)" }}>
            Créer un actif
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--color-text-primary)" }}>
            Mint ERC-721
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
            Flux proche d’OpenSea Studio : métadonnées, média, puis confirmation. Contrat{" "}
            <code className="text-xs px-1 rounded" style={{ background: "var(--color-surface-elevated)" }}>
              {displayContract}
            </code>
            {useChain ? " — transaction Sepolia via mintNFT." : " — simulation locale."}
          </p>
          <ul className="text-sm space-y-2" style={{ color: "var(--color-text-secondary)" }}>
            <li>· TokenId auto-incrémenté</li>
            <li>· Propriété assignée à votre wallet</li>
            <li>· Visible dans {DEMO_COLLECTION_NAME}</li>
          </ul>
        </div>

        <form
          onSubmit={onSubmit}
          className="lg:col-span-3 nft-mp-card nft-mp-glow p-6 sm:p-8 space-y-5"
        >
          <label className="nft-mp-label">
            Nom
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Horizon #01" className={field} />
          </label>
          <label className="nft-mp-label">
            Description
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Traits, utilité, licence…"
              className={`${field} resize-y min-h-[110px]`}
            />
          </label>
          <label className="nft-mp-label">
            URI média (HTTPS / IPFS)
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://… ou ipfs://…"
              className={field}
            />
          </label>
          <button
            type="submit"
            disabled={txPending}
            className="nft-mp-btn nft-mp-btn-primary w-full rounded-xl text-sm py-3.5 disabled:opacity-60"
          >
            {txPending ? "Transaction en cours…" : "Confirmer le mint"}
          </button>
        </form>
      </div>
    </main>
  );
}
