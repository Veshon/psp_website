import { ExternalLinkIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons.jsx";

const pages = [
  ["hub", "Home", "menus.html"],
  ["food", "Food Menu", "food.html"],
  ["drinks", "Drinks Menu", "drinks.html"],
  ["iceCream", "Ice-Cream & Shakes", "ice-cream-and-shakes.html"],
];

export default function SiteFooter({ activePage }) {
  return (
    <footer className="border-t border-palazzo-gold/50 bg-palazzo-burgundy text-palazzo-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-9 sm:px-7 sm:py-11 md:grid-cols-[1.1fr_1fr_auto] md:items-start lg:px-10">
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
          <p className="mb-3 text-[9px] font-semibold uppercase tracking-[.18em] text-palazzo-gold-light">Visit or reserve</p>
          <address className="not-italic text-xs leading-6 text-palazzo-cream/80">
            <a className="inline-flex items-center gap-1.5 transition-colors hover:text-palazzo-gold-light" href="https://maps.google.com/?q=67+Triq+il-Kbira,+Rabat,+Malta" target="_blank" rel="noreferrer">67 Triq il-Kbira, Rabat, Malta <ExternalLinkIcon /></a>
          </address>
          <a className="mt-1 inline-block text-sm font-semibold text-palazzo-gold-light transition-colors hover:text-white" href="tel:+35677055218">+356 7705 5218</a>
          <p className="mt-1 text-[10px] text-palazzo-cream/55">Call for reservations</p>
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
          <p className="mb-2 mt-5 text-[9px] font-semibold uppercase tracking-[.18em] text-palazzo-gold-light">Follow & get in touch</p>
          <div className="flex flex-wrap gap-2">
            <a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-palazzo-gold/55 px-3.5 text-xs text-palazzo-cream transition-colors hover:bg-palazzo-gold hover:text-palazzo-burgundy" href="https://www.facebook.com/profile.php?id=61581584915463" target="_blank" rel="noreferrer" aria-label="Visit Palazzo San Paolo Brasserie on Facebook">
              <FacebookIcon className="h-4 w-4" /> Facebook
            </a>
            <a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-palazzo-gold/55 px-3.5 text-xs text-palazzo-cream transition-colors hover:bg-palazzo-gold hover:text-palazzo-burgundy" href="https://wa.me/35677055218" target="_blank" rel="noreferrer" aria-label="Message Palazzo San Paolo Brasserie on WhatsApp">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-palazzo-gold/55 px-3.5 text-xs text-palazzo-cream transition-colors hover:bg-palazzo-gold hover:text-palazzo-burgundy" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Open Instagram">
              <InstagramIcon className="h-4 w-4" /> Instagram
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/15 pt-4 text-[10px] text-palazzo-cream/60 sm:flex-row sm:items-center sm:justify-between md:col-span-3">
          <p>© {new Date().getFullYear()} Palazzo San Paolo Brasserie</p>
          <a className="w-fit text-palazzo-gold-light transition-colors hover:text-white" href="#top">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
