const pages = [
  ["hub", "Home", "menus.html"],
  ["food", "Food Menu", "food.html"],
  ["drinks", "Drinks Menu", "drinks.html"],
  ["iceCream", "Ice-Cream & Shakes", "ice-cream-and-shakes.html"],
];

export default function SiteHeader({ activePage }) {
  return (
    <header id="top" className="relative z-20 border-b border-palazzo-gold/50 bg-palazzo-burgundy text-palazzo-cream">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-3 px-3 py-3 sm:px-7 sm:py-4 md:min-h-[88px] md:flex-row lg:px-10">
        <a className="flex items-center gap-3.5" href="food.html" aria-label="Palazzo San Paolo Brasserie home">
          <span className="relative grid h-11 w-10 shrink-0 place-items-center sm:h-[58px] sm:w-[52px]">
            <img
              className="absolute inset-0 h-full w-full object-contain p-0.5"
              src="assets/palazzo-logo.png"
              alt="Palazzo San Paolo Brasserie crest"
              onError={(event) => event.currentTarget.remove()}
            />
          </span>
          <span>
            <span className="block font-serif text-[14px] leading-tight tracking-[.09em] sm:text-[19px] sm:tracking-[.11em]">PALAZZO SAN PAOLO</span>
            <span className="mt-1 block text-[8px] tracking-[.18em] text-palazzo-gold-light sm:mt-1.5 sm:text-[9px] sm:tracking-[.24em]">BRASSERIE · RABAT, MALTA</span>
          </span>
        </a>
        <nav className="flex w-full max-w-[580px] flex-nowrap justify-center gap-1 md:w-auto md:gap-4" aria-label="Main navigation">
          {pages.map(([id, label, href]) => (
            <a
              key={id}
              className={`flex-1 whitespace-nowrap border-b py-2.5 text-center text-[8px] uppercase tracking-[.04em] transition sm:px-1 sm:text-[10px] sm:tracking-[.1em] md:flex-none ${
                id === activePage
                  ? "border-palazzo-gold text-palazzo-gold-light"
                  : "border-transparent text-palazzo-cream/75 hover:border-palazzo-gold/50 hover:text-white"
              }`}
              href={href}
              aria-current={id === activePage ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
