import { BrowserProvider } from "ethers";
import { SEPOLIA_CHAIN_ID, SEPOLIA_CHAIN_ID_HEX, SEPOLIA_NETWORK } from "./config";

export function hasInjectedWallet() {
  return typeof window !== "undefined" && Boolean(window.ethereum);
}

export function getBrowserProvider() {
  if (!hasInjectedWallet()) {
    const err = new Error("NO_WALLET");
    throw err;
  }
  return new BrowserProvider(window.ethereum);
}

export async function requestAccounts() {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  return accounts?.[0] ?? null;
}

/** Reprend la session si MetaMask était déjà connecté à ce site (sans popup). */
export async function restoreWalletSession() {
  if (!hasInjectedWallet()) return null;

  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  const account = accounts?.[0] ?? null;
  if (!account) return null;

  const chainId = await getChainId();
  return { account, chainId };
}

export async function getChainId() {
  const hex = await window.ethereum.request({ method: "eth_chainId" });
  return BigInt(hex);
}

export function isSepoliaChain(chainId) {
  return chainId === SEPOLIA_CHAIN_ID;
}

export async function switchToSepolia() {
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: SEPOLIA_CHAIN_ID_HEX }],
    });
  } catch (err) {
    if (err?.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [SEPOLIA_NETWORK],
      });
      return;
    }
    throw err;
  }
}

/** Connexion + bascule Sepolia si nécessaire. */
export async function connectWallet() {
  if (!hasInjectedWallet()) {
    throw new Error("NO_WALLET");
  }

  const account = await requestAccounts();
  if (!account) {
    throw new Error("Aucun compte sélectionné.");
  }

  let chainId = await getChainId();
  if (!isSepoliaChain(chainId)) {
    await switchToSepolia();
    chainId = await getChainId();
  }

  if (!isSepoliaChain(chainId)) {
    const err = new Error("WRONG_NETWORK");
    throw err;
  }

  return { account, chainId };
}

export async function fetchEthBalance(address) {
  const provider = getBrowserProvider();
  const balance = await provider.getBalance(address);
  return Number(balance) / 1e18;
}

export function shortenAddress(address, head = 6, tail = 4) {
  if (!address) return "";
  if (address.length < head + tail + 3) return address;
  return `${address.slice(0, head)}…${address.slice(-tail)}`;
}
