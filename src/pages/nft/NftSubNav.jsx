import { NavLink } from "react-router-dom";

export function NftSubNav() {
  return (
    <div
      className="nft-mp-subnav-shell border-b"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <nav className="flex gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-0.5" aria-label="Navigation marketplace">
          {[
            { to: "/", end: true, label: "Accueil" },
            { to: "/nft", end: true, label: "Découvrir" },

            { to: "/nft/explorer", end: false, label: "Explorer" },
            { to: "/nft/mint", end: false, label: "Mint" },
            { to: "/nft/collection", end: false, label: "Portfolio" },
          ].map(({ to, end, label }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `nft-mp-navlink px-3 sm:px-4 py-3 text-[13px] font-semibold no-underline whitespace-nowrap rounded-t-lg sm:rounded-t-md ${
                  isActive ? "nft-mp-tab-active" : ""
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? "var(--color-text-primary)" : "var(--color-text-secondary)",
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
