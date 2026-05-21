import { PickCard } from "./PickCard";
import { picks } from "../../seed/data";
export function TodaysPicks() {


  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">

        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Today&apos;s Picks
        </h2>

        <a
          href="#"
          className="text-sm font-semibold text-[var(--color-primary)] hover:opacity-70 transition"
        >
          EXPLORE MORE
        </a>

      </div>

      {/* FILTER BAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

        <div className="flex flex-wrap gap-2">
          {["Category", "Price range", "Sale type", "Blockchain"].map((f, i) => (
            <button
              key={i}
              className="px-3 py-1 rounded-full border border-border text-sm hover:bg-surface transition text-[var(--color-text-primary)]"
            >
              {f}
            </button>
          ))}
        </div>

        <button className="px-3 py-1 rounded-full border border-border text-sm hover:bg-surface transition text-[var(--color-text-primary)]">
          ⇅ Sort By: Recently Added
        </button>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {picks.map((item, i) => (
          <PickCard key={i} {...item} />
        ))}
      </div>

      {/* LOAD MORE */}
      <div className="flex justify-center mt-10">
        <button className="px-8 py-3 rounded-md border border-border hover:bg-surface transition text-[var(--color-text-primary)]">
          Load More
        </button>
      </div>

    </section>
  );
}