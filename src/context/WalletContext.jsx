import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SEPOLIA_CHAIN_LABEL } from "../blockchain/config";
import { formatTransactionError } from "../blockchain/errors";
import {
  connectWallet,
  fetchEthBalance,
  getChainId,
  hasInjectedWallet,
  isSepoliaChain,
  restoreWalletSession,
  shortenAddress,
  switchToSepolia,
} from "../blockchain/wallet";
import { HAS_MARKETPLACE } from "../blockchain/addresses";

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [ethBalance, setEthBalance] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  const isSepolia = chainId != null && isSepoliaChain(chainId);
  const connected = Boolean(account);

  const refreshBalance = useCallback(async (addr = account) => {
    if (!addr || !hasInjectedWallet()) return;
    try {
      const bal = await fetchEthBalance(addr);
      setEthBalance(bal);
    } catch {
      setEthBalance(null);
    }
  }, [account]);

  const syncChainState = useCallback(async () => {
    if (!hasInjectedWallet()) return;
    try {
      const id = await getChainId();
      setChainId(id);
    } catch {
      setChainId(null);
    }
  }, []);

  const connect = useCallback(async () => {
    setError(null);
    setIsConnecting(true);
    try {
      const { account: addr, chainId: cid } = await connectWallet();
      setAccount(addr);
      setChainId(cid);
      await refreshBalance(addr);
      return addr;
    } catch (err) {
      const msg = formatTransactionError(err);
      setError(msg);
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, [refreshBalance]);

  const ensureSepolia = useCallback(async () => {
    if (!hasInjectedWallet()) {
      const err = new Error("NO_WALLET");
      throw err;
    }
    let cid = await getChainId();
    if (!isSepoliaChain(cid)) {
      await switchToSepolia();
      cid = await getChainId();
    }
    setChainId(cid);
    if (!isSepoliaChain(cid)) {
      const err = new Error("WRONG_NETWORK");
      throw err;
    }
    return cid;
  }, []);

  const disconnect = useCallback(() => {
    setAccount(null);
    setChainId(null);
    setEthBalance(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (!hasInjectedWallet()) return undefined;

    let cancelled = false;

    (async () => {
      try {
        const session = await restoreWalletSession();
        if (cancelled || !session) return;
        setAccount(session.account);
        setChainId(session.chainId);
        await refreshBalance(session.account);
      } catch {
        /* session non restaurée */
      }
    })();

    const onAccounts = (accounts) => {
      const next = accounts?.[0] ?? null;
      setAccount(next);
      if (!next) {
        setEthBalance(null);
      } else {
        refreshBalance(next);
      }
    };

    const onChain = () => {
      syncChainState();
      if (account) refreshBalance(account);
    };

    window.ethereum.on("accountsChanged", onAccounts);
    window.ethereum.on("chainChanged", onChain);

    return () => {
      cancelled = true;
      window.ethereum.removeListener("accountsChanged", onAccounts);
      window.ethereum.removeListener("chainChanged", onChain);
    };
  }, [account, refreshBalance, syncChainState]);

  const value = useMemo(
    () => ({
      account,
      chainId,
      ethBalance,
      isConnecting,
      error,
      connected,
      isSepolia,
      hasWallet: hasInjectedWallet(),
      hasMarketplace: HAS_MARKETPLACE,
      chainLabel: isSepolia ? SEPOLIA_CHAIN_LABEL : chainId ? `Chain ${chainId}` : "—",
      shortAccount: shortenAddress(account),
      connect,
      disconnect,
      ensureSepolia,
      refreshBalance,
      setError,
      clearError: () => setError(null),
    }),
    [
      account,
      chainId,
      ethBalance,
      isConnecting,
      error,
      connected,
      isSepolia,
      connect,
      disconnect,
      ensureSepolia,
      refreshBalance,
    ]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    throw new Error("useWallet doit être utilisé sous WalletProvider");
  }
  return ctx;
}
