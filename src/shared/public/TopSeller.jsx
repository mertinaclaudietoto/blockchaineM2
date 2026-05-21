import { SellerCard } from "./SellerCard";
import { sellers } from "../../seed/data";
export function TopSeller() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-7">
        <h2
          className="text-2xl font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Top Seller
        </h2>
        <div className="flex gap-2">
          <button className="w-8 h-8 rounded-full border border-border text-[var(--color-text-primary)] hover:bg-surface transition">
            ‹
          </button>

          <button className="w-8 h-8 rounded-full bg-primary text-white">
            ›
          </button>
        </div>
      </div>

      {/* SCROLL ROW */}
      <div className="flex gap-5 overflow-x-auto pb-2 " >
        {sellers.map((seller, i) => (
          <SellerCard key={i} {...seller} />
        ))}
      </div>
    </section>
  );
}