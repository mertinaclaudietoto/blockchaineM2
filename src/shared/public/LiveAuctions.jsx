import { AuctionCard } from "./AuctionCard";
import { auctions } from "../../seed/data";
export function LiveAuctions() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14 " >

      {/* HEADER */}
      <div className="flex items-center justify-between mb-7">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Live Auctions
        </h2>

        <a
          href="#"
          className="text-sm font-semibold tracking-wider text-[var(--color-primary)] hover:opacity-70"
        >
          EXPLORE MORE
        </a>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {auctions.map((item, index) => (
          <AuctionCard key={index} {...item} />
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-2 mt-8">

        <button className="w-8 h-8 rounded-full border border-border text-[var(--color-text-primary)]">
          ‹
        </button>

        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === 1 ? "bg-primary" : "bg-border"
            }`}
          />
        ))}

        <button className="w-8 h-8 rounded-full border border-border text-[var(--color-text-primary)] bg-surface">
          ›
        </button>

      </div>
    </section>
  );
}