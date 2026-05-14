export function formatEth(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return `${Number(n).toFixed(n < 0.01 ? 4 : 2)} ETH`;
}
