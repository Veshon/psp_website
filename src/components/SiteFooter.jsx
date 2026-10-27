const pages = [
  ["food", "Food Menu", "food.html"],
  ["drinks", "Drinks Menu", "drinks.html"],
  ["iceCream", "Ice-Cream & Shakes", "ice-cream-and-shakes.html"],
];

export default function SiteFooter({ activePage }) {
  return (
    <footer className="border-t border-palazzo-gold/50 bg-palazzo-burgundy text-palazzo-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:px-7 sm:py-11 md:grid-cols-[1fr_auto] md:items-center lg:px-10">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[.2em] text-palazzo-gold-light">
            Rabat, Malta
          </p>
          <h2 className="mt-2 font-serif text-xl tracking-[.04em] sm:text-2xl">
            Palazzo San Paolo Brasserie
          </h2>
          <p className="mt-1.5 text-xs text-palazzo-cream/70">“A Palace of Timeless Taste”</p>
        </div>

        <div>
          <p className="mb-2 text-[9px] font-semibold uppercase tracking-[.18em] text-palazzo-gold-light">
            Explore the menus
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-xs" aria-label="Menu pages">
            {pages.map(([id, label, href]) => (
              <a
                className={`py-1 transition-colors hover:text-palazzo-gold-light ${id === activePage ? "text-palazzo-gold-light" : "text-palazzo-cream/80"}`}
                href={href}
                key={id}
                aria-current={id === activePage ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 pt-4 text-[10px] text-palazzo-cream/60 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
          <p>© {new Date().getFullYear()} Palazzo San Paolo Brasserie</p>
          <a className="w-fit text-palazzo-gold-light transition-colors hover:text-white" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
