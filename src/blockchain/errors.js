import { SEPOLIA_CHAIN_LABEL } from "./config";

/**
 * Transforme une erreur wallet / ethers en message lisible (français).
 */
export function formatTransactionError(err) {
  if (!err) return "Une erreur inconnue s’est produite.";

  const code = err.code ?? err.info?.error?.code;
  const message = String(err.reason ?? err.shortMessage ?? err.message ?? "");

  if (code === 4001 || code === "ACTION_REJECTED" || /user rejected|user denied/i.test(message)) {
    return "Transaction refusée dans le wallet.";
  }

  if (/insufficient funds|insufficient balance/i.test(message)) {
    return "Fonds insuffisants pour payer le gaz ou le prix.";
  }

  if (
    err.message === "WRONG_NETWORK" ||
    /wrong network|chain mismatch|unsupported chain/i.test(message)
  ) {
    return `Réseau incorrect : basculez sur ${SEPOLIA_CHAIN_LABEL}.`;
  }

  if (err.message === "NO_WALLET" || /no ethereum provider|metamask/i.test(message)) {
    return "MetaMask (ou un wallet compatible) est requis.";
  }

  if (err.message === "NO_CONTRACT") {
    return "Contrat marketplace non configuré (VITE_NFT_MARKETPLACE_ADDRESS).";
  }

  if (
    err.message === "CONTRACT_IS_WALLET" ||
    /internal accounts cannot include data/i.test(message) ||
    code === -32602
  ) {
    return (
      "L’adresse dans .env est votre wallet MetaMask, pas le contrat. " +
      "Déployez NFTMarketplace sur Sepolia et mettez l’adresse du contrat dans VITE_NFT_MARKETPLACE_ADDRESS."
    );
  }

  if (err.message === "NOT_A_CONTRACT") {
    return (
      "Aucun contrat à cette adresse sur Sepolia. Déployez le contrat (npm run deploy:sepolia) " +
      "et copiez la nouvelle adresse dans .env."
    );
  }

  if (/Item is not listed|NOT_LISTED/i.test(message)) {
    return "Ce NFT n’est plus en vente.";
  }

  if (/Seller cannot buy|cannot buy own/i.test(message)) {
    return "Vous ne pouvez pas acheter votre propre NFT.";
  }

  if (/Insufficient payment/i.test(message)) {
    return "Montant ETH insuffisant pour cet achat.";
  }

  if (/CALL_EXCEPTION|execution reverted/i.test(message)) {
    const revert = err.revert?.args?.[0] ?? err.reason;
    if (revert && typeof revert === "string") return revert;
    return "La transaction a échoué (revert du contrat).";
  }

  if (/transaction failed|receipt status/i.test(message)) {
    return "La transaction a échoué sur la chaîne.";
  }

  if (message.length > 0 && message.length < 200) return message;

  return "Erreur lors de l’interaction avec la blockchain.";
}
