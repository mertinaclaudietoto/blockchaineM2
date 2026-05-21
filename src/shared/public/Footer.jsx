export function Footer() {
  const links = {
    account: ["Authors", "Collection", "Author Profile", "Create Collection"],
    resources: ["Help & Support", "Live Auctions", "Item Details", "Activity"],
    company: ["About Us", "Contact Us", "Our Blog", "Discover"],
  };

  return (
    <footer
      className="border-t"
      style={{
        background: "var(--color-background)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* BRAND */}
        <div className="lg:col-span-1">

          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs text-white">
              🔥
            </div>

            <span
              className="font-bold text-lg"
              style={{ color: "var(--color-text-primary)" }}
            >
              Axies
            </span>
          </div>

          <p
            className="text-xs leading-relaxed mb-5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quis nun, fugiat aut lobortis enim vitae.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-2">

            {["f", "𝕏", "G", "▶"].map((icon, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs cursor-pointer transition hover:bg-surface"
                style={{
                  color: "var(--color-text-primary)",
                  border: "1px solid var(--color-border)",
                }}
              >
                {icon}
              </div>
            ))}

          </div>

        </div>

        {/* LINKS */}
        <div>
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            My Account
          </h4>

          <ul className="space-y-2.5">
            {links.account.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-xs hover:opacity-70 transition"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* RESOURCES */}
        <div>
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Resources
          </h4>

          <ul className="space-y-2.5">
            {links.resources.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-xs hover:opacity-70 transition"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Company
          </h4>

          <ul className="space-y-2.5">
            {links.company.map((item, i) => (
              <li key={i}>
                <a
                  href="#"
                  className="text-xs hover:opacity-70 transition"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* SUBSCRIBE */}
        <div>
          <h4
            className="font-semibold text-sm mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Subscribe Us
          </h4>

          <div className="relative">

            <input
              type="email"
              placeholder="info@youremail.com"
              className="w-full px-4 py-2 rounded-md border pr-10 bg-transparent outline-none"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />

            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))",
              }}
            >
              ›
            </button>

          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div
        className="border-t max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderColor: "var(--color-border)" }}
      >

        <p
          className="text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          © 2022 Axies - Designed by Themesflat
        </p>

        <div className="flex gap-5">

          {["Privacy Policy", "Terms & Conditions"].map((item, i) => (
            <a
              key={i}
              href="#"
              className="text-xs hover:opacity-70 transition"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item}
            </a>
          ))}

        </div>

      </div>
    </footer>
  );
}