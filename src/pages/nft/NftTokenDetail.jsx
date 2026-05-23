import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { formatEth } from "../../utils/formatEth";
import { DEMO_COLLECTION_NAME } from "../../seed/nftDemoData";

export function NftTokenDetail() {
  const { tokenId: tokenIdParam } = useParams();
  const navigate = useNavigate();
  const {
    getNft,
    displayContract,
    listForSale,
    unlist,
    buy,
    showToast,
    marketStats,
    isOwner,
    txPending,
    useChain,
  } = useNftMarketplace();

  const nft = getNft(tokenIdParam);
  const [listOpen, setListOpen] = useState(false);
  const [listPrice, setListPrice] = useState("");
  const [buying, setBuying] = useState(false);

  if (!nft) {
    return (
      <main className="max-w-[1400px] mx-auto px-6 py-20 text-center space-y-5">
        <div className="nft-mp-empty max-w-md mx-auto">
          <div className="nft-mp-empty-icon" aria-hidden>
            ⧗
          </div>
          <p className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
            Token introuvable
          </p>
          <p>Ce tokenId n’existe pas dans la collection.</p>
        </div>
        <Link to="/nft/explorer" className="nft-mp-link">
          ← Retour au marché
        </Link>
      </main>
    );
  }

  const isMine = isOwner(nft.owner);

  const submitList = async () => {
    const p = parseFloat(String(listPrice).replace(",", "."));
    if (Number.isNaN(p) || p <= 0) {
      showToast("Prix ETH invalide.");
      return;
    }
    const ok = await listForSale(nft.tokenId, p);
    if (ok) {
      setListOpen(false);
      setListPrice("");
    }
  };

  const onBuy = async () => {
    setBuying(true);
    try {
      const ok = await buy(nft.tokenId);
      if (ok) navigate("/nft/collection");
    } finally {
      setBuying(false);
    }
  };

  const busy = buying || txPending;

  return (
    <main className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8">
      <nav className="nft-mp-breadcrumb text-[11px] mb-8 flex flex-wrap items-center gap-2 font-medium" style={{ color: "var(--color-text-muted)" }}>
        <Link to="/nft" className="nft-mp-link font-semibold">
          {DEMO_COLLECTION_NAME}
        </Link>
        <span aria-hidden>/</span>
        <Link to="/nft/explorer" className="nft-mp-link font-semibold">
          Explorer
        </Link>
        <span aria-hidden>/</span>
        <span style={{ color: "var(--color-text-primary)" }}>#{nft.tokenId}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] items-start">
        <div className="space-y-4">
          <div className="nft-mp-card nft-mp-glow overflow-hidden p-2 sm:p-3">
            <img src={nft.imageUrl} alt="" className="w-full rounded-lg aspect-square object-cover" />
          </div>
          <div className="nft-mp-card p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide mb-2" style={{ color: "var(--color-text-secondary)" }}>
              Description
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-primary)" }}>
              {nft.description}
            </p>
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-24">
          <div>
            <p className="text-[11px] font-mono mb-1" style={{ color: "var(--color-text-secondary)" }}>
              {displayContract}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--color-text-primary)" }}>
              {nft.name}
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
              Token #{nft.tokenId}
            </p>
          </div>

          <div
            className="rounded-2xl border p-5 space-y-4 nft-mp-glow"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface-elevated)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                Prix courant
              </span>
              <span className="nft-mp-price-mono text-xl font-bold" style={{ color: "var(--color-text-primary)" }}>
                {nft.listed ? formatEth(nft.priceEth) : "Non listé"}
              </span>
            </div>
            {nft.listed && marketStats.floorEth != null && (
              <p className="text-[11px]" style={{ color: "var(--color-text-secondary)" }}>
                Floor collection : <span className="nft-mp-price-mono">{formatEth(marketStats.floorEth)}</span>
              </p>
            )}

            <div className="h-px" style={{ backgroundColor: "var(--color-border)" }} />

            <dl className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <dt style={{ color: "var(--color-text-secondary)" }}>Propriétaire</dt>
                <dd className="font-mono mt-0.5 truncate" style={{ color: "var(--color-text-primary)" }} title={nft.owner}>
                  {nft.owner}
                  {isMine ? " (vous)" : ""}
                </dd>
              </div>
              <div>
                <dt style={{ color: "var(--color-text-secondary)" }}>Créateur</dt>
                <dd className="font-mono mt-0.5 truncate" style={{ color: "var(--color-text-primary)" }} title={nft.creator}>
                  {nft.creator}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-2.5 pt-1">
              {isMine && !nft.listed && (
                <button
                  type="button"
                  onClick={() => setListOpen(true)}
                  disabled={busy}
                  className="nft-mp-btn nft-mp-btn-primary w-full rounded-xl text-sm disabled:opacity-60"
                >
                  Lister pour de l’ETH
                </button>
              )}
              {isMine && nft.listed && (
                <button
                  type="button"
                  onClick={() => unlist(nft.tokenId)}
                  disabled={busy || useChain}
                  className="nft-mp-btn nft-mp-btn-ghost w-full rounded-xl text-sm disabled:opacity-60"
                  title={useChain ? "Retrait non implémenté on-chain" : undefined}
                >
                  Retirer du marché
                </button>
              )}
              {!isMine && nft.listed && (
                <button
                  type="button"
                  onClick={onBuy}
                  disabled={busy}
                  className="nft-mp-btn nft-mp-btn-mint w-full rounded-xl text-sm disabled:opacity-60"
                >
                  {busy ? "Transaction…" : `Acheter · ${formatEth(nft.priceEth)}`}
                </button>
              )}
              {!nft.listed && !isMine && (
                <p className="text-xs text-center py-2" style={{ color: "var(--color-text-secondary)" }}>
                  Pas d’offre « Buy now » sur ce token.
                </p>
              )}
            </div>
          </div>

          <p className="text-[11px] leading-relaxed px-1" style={{ color: "var(--color-text-secondary)" }}>
            {useChain
              ? "Achat via buyItem sur Sepolia : MetaMask enverra la valeur en ETH au contrat."
              : "Mode démo : connectez MetaMask sur Sepolia et configurez VITE_NFT_MARKETPLACE_ADDRESS pour les transactions réelles."}
          </p>
        </div>
      </div>

      {listOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.65)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="list-title"
        >
          <div
            className="w-full max-w-md rounded-2xl border p-6 space-y-4 nft-mp-glow"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface-elevated)",
            }}
          >
            <h2 id="list-title" className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
              Fixer le prix (ETH)
            </h2>
            <input
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
              inputMode="decimal"
              placeholder="0.08"
              className="nft-mp-input w-full px-3 py-2.5 text-sm rounded-xl"
            />
            <div className="flex justify-end gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setListOpen(false)}
                className="nft-mp-btn nft-mp-btn-ghost text-sm px-4"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={submitList}
                disabled={busy}
                className="nft-mp-btn nft-mp-btn-primary text-sm px-5 disabled:opacity-60"
              >
                Publier
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
