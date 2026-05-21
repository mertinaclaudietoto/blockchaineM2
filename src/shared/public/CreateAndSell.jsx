import { steps } from "../../seed/data";
export function CreateAndSell() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      {/* TITLE */}
      <h2
        className="text-2xl font-bold mb-10"
        style={{ color: "var(--color-text-primary)" }}
      >
        Create And Sell Your NFTs
      </h2>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {steps.map((step, i) => (
          <div key={i}>

            {/* ICON WRAPPER */}
            <div
              className="mb-4 w-fit p-3 rounded-2xl"
              style={{ background: step.soft }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
                style={{ background: step.bg }}
              >
                {step.emoji}
              </div>
            </div>

            {/* TITLE */}
            <h3
              className="font-semibold mb-2"
              style={{ color: "var(--color-text-primary)" }}
            >
              {step.title}
            </h3>

            {/* DESCRIPTION */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {step.desc}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}