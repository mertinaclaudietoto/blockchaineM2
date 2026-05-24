import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { HAS_MARKETPLACE, MARKETPLACE_ADDRESS } from "../blockchain/addresses";
import { formatTransactionError } from "../blockchain/errors";
import {
  buyItem as buyItemOnChain,
  fetchMarketplaceNfts,
  fetchMarketplaceSalesStats,
  listItem as listItemOnChain,
  mintNft,
} from "../blockchain/marketplace";
import { SEPOLIA_CHAIN_LABEL } from "../blockchain/config";
import { shortenAddress } from "../blockchain/wallet";
import {
  createInitialNfts,
  DEMO_COLLECTION_NAME,
} from "../seed/nftDemoData";
import { formatEth } from "../utils/formatEth";
import { useWallet } from "./WalletContext";

const NftMarketplaceContext = createContext(null);

function toMetadataUri(metadata) {
  const json = JSON.stringify(metadata);
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return `data:application/json;base64,${btoa(binary)}`;
}

export function NftMarketplaceProvider({ children }) {
  const {
    account,
    connected,
    isSepolia,
    ethBalance: walletBalance,
    refreshBalance,
    ensureSepolia,
  } = useWallet();

  const [nfts, setNfts] = useState(createInitialNfts);
  const [demoEthBalance, setDemoEthBalance] = useState(2.5);
  const [toast, setToast] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [salesStats, setSalesStats] = useState({
    sales: 0,
    volumeEth: 0,
    participants: 0,
  });
  const nextIdRef = useRef(4);
  const toastTimeoutRef = useRef(null);

  const useChain = HAS_MARKETPLACE && connected && isSepolia;
  const walletAddress = useChain ? account : null;
  const displayWallet = walletAddress
    ? shortenAddress(walletAddress)
    : "0x71C…9A2e";
  const displayContract = HAS_MARKETPLACE
    ? shortenAddress(MARKETPLACE_ADDRESS, 8, 6)
    : "0x8f3a…e4B1";
  const displayChain = (() => {
    if (!HAS_MARKETPLACE) return "Contrat non configuré (.env)";
    if (!connected) return "Wallet non connecté";
    if (!isSepolia) return "Basculez sur Sepolia";
    return SEPOLIA_CHAIN_LABEL;
  })();
  const ethBalance =
    connected && isSepolia && walletBalance != null
      ? walletBalance
      : connected && isSepolia
        ? 0
        : demoEthBalance;

  const showToast = useCallback((msg) => {
    setToast(msg);
    if (toastTimeoutRef.current) window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  const refreshFromChain = useCallback(async () => {
    if (!HAS_MARKETPLACE || !connected) return;
    setIsSyncing(true);
    try {
      await ensureSepolia();
      const [list, chainSalesStats] = await Promise.all([
        fetchMarketplaceNfts(),
        fetchMarketplaceSalesStats().catch(() => ({
          sales: 0,
          volumeEth: 0,
          participants: 0,
        })),
      ]);
      if (list.length > 0) {
        setNfts(list);
      }
      setSalesStats(chainSalesStats);
    } catch (err) {
      showToast(formatTransactionError(err));
    } finally {
      setIsSyncing(false);
    }
  }, [connected, ensureSepolia, showToast]);

  useEffect(() => {
    if (useChain) {
      refreshFromChain();
      refreshBalance();
    }
  }, [useChain, refreshFromChain, refreshBalance]);

  const getNft = useCallback(
    (tokenId) => {
      const id = Number(tokenId);
      return nfts.find((n) => n.tokenId === id) ?? null;
    },
    [nfts]
  );

  const runTx = useCallback(
    async (fn, successMessage) => {
      if (!HAS_MARKETPLACE) {
        showToast("Déployez le contrat et définissez VITE_NFT_MARKETPLACE_ADDRESS.");
        return false;
      }
      if (!connected) {
        showToast("Connectez MetaMask pour continuer.");
        return false;
      }
      setTxPending(true);
      try {
        await ensureSepolia();
        await fn();
        showToast(successMessage);
        await refreshFromChain();
        await refreshBalance();
        return true;
      } catch (err) {
        showToast(formatTransactionError(err));
        return false;
      } finally {
        setTxPending(false);
      }
    },
    [connected, ensureSepolia, refreshFromChain, refreshBalance, showToast]
  );

  const mint = useCallback(
    async ({ name, description, imageUrl }) => {
      const trimmedName = name.trim() || "Sans titre";
      const trimmedDesc =
        description.trim() || "NFT créé via le marketplace.";
      const img =
        imageUrl.trim() ||
        `https://picsum.photos/seed/m${Date.now()}/${480}/${480}`;

      if (useChain) {
        const tokenURI = toMetadataUri({
          name: trimmedName,
          description: trimmedDesc,
          image: img,
        });
        let mintedId = null;
        const ok = await runTx(async () => {
          const result = await mintNft(tokenURI);
          mintedId = result.tokenId;
        }, "NFT minté sur Sepolia.");
        if (!ok) return null;
        if (mintedId != null) return mintedId;
        const latest = await fetchMarketplaceNfts();
        return latest[latest.length - 1]?.tokenId ?? null;
      }

      const tokenId = nextIdRef.current;
      nextIdRef.current += 1;
      setNfts((prev) => [
        {
          tokenId,
          name: trimmedName,
          description: trimmedDesc,
          imageUrl: img,
          creator: displayWallet,
          owner: displayWallet,
          listed: false,
          priceEth: null,
        },
        ...prev,
      ]);
      showToast("Transaction mint simulée — token enregistré localement.");
      return tokenId;
    },
    [useChain, runTx, displayWallet, showToast]
  );

  const listForSale = useCallback(
    async (tokenId, priceEth) => {
      if (useChain) {
        return runTx(
          () => listItemOnChain(tokenId, priceEth),
          "NFT listé sur le marché."
        );
      }
      setNfts((prev) =>
        prev.map((n) =>
          n.tokenId === tokenId
            ? { ...n, listed: true, priceEth }
            : n
        )
      );
      showToast("Listing simulé : prix affiché sur le marché.");
      return true;
    },
    [useChain, runTx, showToast]
  );

  const unlist = useCallback(
    (tokenId) => {
      if (useChain) {
        showToast("Retrait on-chain : appelez listItem avec prix 0 ou ajoutez unwithdraw au contrat.");
        return false;
      }
      setNfts((prev) =>
        prev.map((n) =>
          n.tokenId === tokenId
            ? { ...n, listed: false, priceEth: null }
            : n
        )
      );
      showToast("NFT retiré de la vente (simulation).");
      return true;
    },
    [useChain, showToast]
  );

  const buy = useCallback(
    async (tokenId) => {
      const nft = nfts.find((n) => n.tokenId === tokenId);
      if (!nft?.listed) {
        showToast("Ce token n’est pas listé.");
        return false;
      }

      if (useChain) {
        if (
          walletAddress &&
          nft.owner?.toLowerCase() === walletAddress.toLowerCase()
        ) {
          showToast("Impossible d’acheter votre propre NFT.");
          return false;
        }
        return runTx(
          () => buyItemOnChain(tokenId),
          `Achat confirmé pour ${formatEth(nft.priceEth)}.`
        );
      }

      const price = nft.priceEth;
      if (demoEthBalance < price) {
        showToast("Solde ETH (démo) insuffisant.");
        return false;
      }
      setDemoEthBalance((b) => b - price);
      setNfts((prev) =>
        prev.map((n) =>
          n.tokenId === tokenId
            ? { ...n, owner: displayWallet, listed: false, priceEth: null }
            : n
        )
      );
      showToast(
        `Achat simulé : ${formatEth(price)} — NFT transféré vers votre wallet.`
      );
      return true;
    },
    [nfts, useChain, walletAddress, runTx, demoEthBalance, displayWallet, showToast]
  );

  const isOwner = useCallback(
    (owner) => {
      if (!owner) return false;
      if (useChain && walletAddress) {
        return owner.toLowerCase() === walletAddress.toLowerCase();
      }
      return owner === displayWallet || owner.includes("71C");
    },
    [useChain, walletAddress, displayWallet]
  );

  const listedNfts = useMemo(() => nfts.filter((n) => n.listed), [nfts]);
  const myNfts = useMemo(
    () => nfts.filter((n) => isOwner(n.owner)),
    [nfts, isOwner]
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
      salesStats,
      marketStats,
      ethBalance,
      walletAddress,
      displayWallet,
      displayContract,
      displayChain,
      contractAddress: HAS_MARKETPLACE ? MARKETPLACE_ADDRESS : null,
      collectionName: DEMO_COLLECTION_NAME,
      useChain,
      isSyncing,
      txPending,
      getNft,
      mint,
      listForSale,
      unlist,
      buy,
      isOwner,
      showToast,
      refreshFromChain,
      /** @deprecated utiliser displayWallet */
      DEMO_WALLET: displayWallet,
      /** @deprecated utiliser displayContract */
      DEMO_CONTRACT: displayContract,
      /** @deprecated utiliser displayChain */
      DEMO_CHAIN: displayChain,
    }),
    [
      nfts,
      listedNfts,
      myNfts,
      salesStats,
      marketStats,
      ethBalance,
      walletAddress,
      displayWallet,
      displayContract,
      displayChain,
      useChain,
      isSyncing,
      txPending,
      getNft,
      mint,
      listForSale,
      unlist,
      buy,
      isOwner,
      showToast,
      refreshFromChain,
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
            boxShadow:
              "0 8px 32px color-mix(in srgb, var(--color-foreground) 12%, transparent)",
          }}
        >
          {toast}
        </div>
      ) : null}
    </NftMarketplaceContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNftMarketplace() {
  const ctx = useContext(NftMarketplaceContext);
  if (!ctx) {
    throw new Error("useNftMarketplace doit être utilisé sous NftMarketplaceProvider");
  }
  return ctx;
}
