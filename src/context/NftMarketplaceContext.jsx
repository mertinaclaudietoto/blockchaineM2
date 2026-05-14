import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  createInitialNfts,
  DEMO_CHAIN,
  DEMO_CONTRACT,
  DEMO_WALLET,
} from "../seed/nftDemoData";
import { formatEth } from "../utils/formatEth";

const NftMarketplaceContext = createContext(null);

export function NftMarketplaceProvider({ children }) {
  const [nfts, setNfts] = useState(createInitialNfts);
  const [ethBalance, setEthBalance] = useState(2.5);
  const [toast, setToast] = useState(null);
  const nextIdRef = useRef(4);
  const toastTimeoutRef = useRef(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 2800);
  }, []);

  const getNft = useCallback(
    (tokenId) => {
      const id = Number(tokenId);
      return nfts.find((n) => n.tokenId === id) ?? null;
    },
    [nfts]
  );

  const mint = useCallback(
    ({ name, description, imageUrl }) => {
      const tokenId = nextIdRef.current;
      nextIdRef.current += 1;
      const trimmedName = name.trim() || `Sans titre #${tokenId}`;
      const trimmedDesc =
        description.trim() || "NFT créé en simulation (hors chaîne).";
      const img =
        imageUrl.trim() ||
        `https://picsum.photos/seed/m${tokenId}/${480}/${480}`;

      setNfts((prev) => [
        {
          tokenId,
          name: trimmedName,
          description: trimmedDesc,
          imageUrl: img,
          creator: DEMO_WALLET,
          owner: DEMO_WALLET,
          listed: false,
          priceEth: null,
        },
        ...prev,
      ]);
      showToast("Transaction mint simulée — token enregistré localement.");
      return tokenId;
    },
    [showToast]
  );

  const listForSale = useCallback(
    (tokenId, priceEth) => {
      setNfts((prev) =>
        prev.map((n) =>
          n.tokenId === tokenId && n.owner === DEMO_WALLET
            ? { ...n, listed: true, priceEth }
            : n
        )
      );
      showToast("Listing simulé : prix affiché sur le marché.");
    },
    [showToast]
  );

  const unlist = useCallback(
    (tokenId) => {
      setNfts((prev) =>
        prev.map((n) =>
          n.tokenId === tokenId && n.owner === DEMO_WALLET
            ? { ...n, listed: false, priceEth: null }
            : n
        )
      );
      showToast("NFT retiré de la vente (simulation).");
    },
    [showToast]
  );

  const buy = useCallback(
    (tokenId) => {
      const nft = nfts.find((n) => n.tokenId === tokenId);
      if (!nft?.listed) {
        showToast("Ce token n’est pas listé.");
        return false;
      }
      if (nft.owner === DEMO_WALLET) {
        showToast("Impossible d’acheter votre propre NFT.");
        return false;
      }
      const price = nft.priceEth;
      if (ethBalance < price) {
        showToast("Solde ETH (démo) insuffisant.");
        return false;
      }
      setEthBalance((b) => b - price);
      setNfts((prev) =>
        prev.map((n) =>
          n.tokenId === tokenId
            ? { ...n, owner: DEMO_WALLET, listed: false, priceEth: null }
            : n
        )
      );
      showToast(
        `Achat simulé : ${formatEth(price)} vers le vendeur, NFT transféré vers votre wallet.`
      );
      return true;
    },
    [nfts, ethBalance, showToast]
  );

  const listedNfts = useMemo(() => nfts.filter((n) => n.listed), [nfts]);
  const myNfts = useMemo(
    () => nfts.filter((n) => n.owner === DEMO_WALLET),
    [nfts]
  );

  const marketStats = useMemo(() => {
    const prices = listedNfts.map((n) => n.priceEth).filter((p) => p != null);
    const floorEth = prices.length ? Math.min(...prices) : null;
    const uniqueOwners = new Set(nfts.map((n) => n.owner)).size;
    return {
      floorEth,
      listings: listedNfts.length,
      items: nfts.length,
      uniqueOwners,
    };
  }, [nfts, listedNfts]);

  const value = useMemo(
    () => ({
      nfts,
      listedNfts,
      myNfts,
      marketStats,
      ethBalance,
      DEMO_WALLET,
      DEMO_CONTRACT,
      DEMO_CHAIN,
      getNft,
      mint,
      listForSale,
      unlist,
      buy,
      showToast,
    }),
    [
      nfts,
      listedNfts,
      myNfts,
      marketStats,
      ethBalance,
      getNft,
      mint,
      listForSale,
      unlist,
      buy,
      showToast,
    ]
  );

  return (
    <NftMarketplaceContext.Provider value={value}>
      {children}
      {toast ? (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-4 py-3 rounded-lg shadow-lg text-sm max-w-md text-center pointer-events-none border"
          style={{
            backgroundColor: "var(--color-surface)",
            color: "var(--color-text-primary)",
            borderColor: "var(--color-border)",
            boxShadow: "0 8px 32px color-mix(in srgb, var(--color-foreground) 12%, transparent)",
          }}
        >
          {toast}
        </div>
      ) : null}
    </NftMarketplaceContext.Provider>
  );
}

// Hook exporté à côté du provider (pattern classique React).
// eslint-disable-next-line react-refresh/only-export-components
export function useNftMarketplace() {
  const ctx = useContext(NftMarketplaceContext);
  if (!ctx) {
    throw new Error("useNftMarketplace doit être utilisé sous NftMarketplaceProvider");
  }
  return ctx;
}
