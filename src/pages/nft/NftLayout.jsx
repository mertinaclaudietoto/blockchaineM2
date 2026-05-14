import { Outlet } from "react-router-dom";
import { useNftMarketplace } from "../../context/NftMarketplaceContext";
import { DEMO_CONTRACT } from "../../seed/nftDemoData";
import { NftMarketplaceFooter } from "./NftMarketplaceFooter";
import { NftMarketplaceHeader } from "./NftMarketplaceHeader";
import { NftSubNav } from "./NftSubNav";
import "./nftMarketplace.css";

function NftChainStrip() {
  const { DEMO_CHAIN } = useNftMarketplace();

  return (
    <div
      className="nft-mp-chain-strip border-b"
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text-secondary)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center gap-x-4 gap-y-1 justify-between">
        <span className="font-mono truncate max-w-[70vw] sm:max-w-none text-[11px] leading-relaxed">
          <span style={{ color: "var(--color-text-muted)" }}>ERC-721 · </span>
          <span style={{ color: "var(--color-text-primary)" }}>{DEMO_CONTRACT}</span>
        </span>
        <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider opacity-90">{DEMO_CHAIN}</span>
      </div>
    </div>
  );
}

export function NftLayout() {
  return (
    <div className="nft-mp flex flex-col min-h-screen">
      <NftMarketplaceHeader />
      <NftSubNav />
      <NftChainStrip />
      <div className="nft-mp-content">
        <Outlet />
      </div>
      <NftMarketplaceFooter />
    </div>
  );
}
