import { CollectionCard } from "./CollectionCard";
import { collections } from "../../seed/data";
export function PopularCollection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-7">

        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          Popular Collection
        </h2>

        <a
          href="#"
          className="text-sm font-semibold text-[var(--color-primary)] hover:opacity-70 transition"
        >
          EXPLORE MORE
        </a>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {collections.map((col, i) => (
          <CollectionCard key={i} {...col} />
        ))}
      </div>

    </section>
  );
}