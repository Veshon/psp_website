import { ExternalLinkIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from "./BrandIcons.jsx";

const links = [
  {
    title: "Food",
    subtitle: "Brasserie favourites & something for every appetite",
    href: "food.html",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85",
    alt: "Freshly prepared restaurant meal",
    icon: "",
  },
  {
    title: "Drinks",
    subtitle: "Cocktails, wine, coffee & more",
    href: "drinks.html",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1000&q=85",
    alt: "A colourful cocktail",
    icon: "",
  },
  {
    title: "Ice Cream",
    subtitle: "A scoop of something lovely",
    href: "ice-cream-and-shakes.html",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=85",
    alt: "Scoops of ice cream",
    icon: "",
  },
  {
    title: "Milkshakes",
    subtitle: "Thick, creamy & made for a treat",
    href: "ice-cream-and-shakes.html#milkshakes",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=1000&q=85",
    alt: "A creamy milkshake",
    icon: "",
  }
];

export default function MenuHub() {
  return (
    <main className="menu-hub relative min-h-screen overflow-hidden px-4 pb-12 pt-8 text-white sm:px-6 sm:pb-16 sm:pt-12">
      <div className="menu-hub-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl">
        <header className="mb-8 text-center sm:mb-11">
          <a href="food.html" className="mx-auto mb-5 grid h-[102px] w-[102px] p-4 sm:h-[158px] sm:w-[158px] sm:p-[18px]" aria-label="Palazzo San Paolo Brasserie menu">
            <img src="assets/palazzo-logo.png" alt="Palazzo San Paolo Brasserie crest" className="h-full w-full object-contain" />
          </a>
          <p className="text-[10px] font-semibold uppercase tracking-[.32em] text-[#e5ca8d]">Rabat · Malta</p>
          <h1 className="mt-2 font-serif text-[2.15rem] tracking-[.015em] text-[#f0d38f] sm:text-5xl">Palazzo San Paolo</h1>
          <p className="mt-1.5 text-[10px] uppercase tracking-[.3em] text-white/75 sm:text-xs">Brasserie</p>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/80 sm:text-base">A palace of timeless taste.<br className="sm:hidden" /> Find something to savour.</p>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3" aria-hidden="true"><span className="h-px w-12 bg-[#c69b52]/65" /><span className="h-1.5 w-1.5 rotate-45 border border-[#e5ca8d]" /><span className="h-px w-12 bg-[#c69b52]/65" /></div>
        </header>

        <section aria-labelledby="menu-links-title">
          <h2 id="menu-links-title" className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[.28em] text-[#e0c98d] sm:mb-5">Explore our menus</h2>
          <div className="grid gap-3.5 sm:grid-cols-2 sm:gap-5">
            {links.map((link, index) => (
              <a key={link.title} href={link.href} className="group overflow-hidden rounded-[19px] border border-[#d6b56d]/55 bg-[#fbf8f0] text-[#2b1d18] shadow-[0_10px_28px_rgba(0,0,0,.23)] transition duration-200 hover:-translate-y-1 hover:border-[#e5ca8d] hover:shadow-[0_16px_36px_rgba(0,0,0,.33)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e5ca8d]">
                <div className="relative h-40 overflow-hidden sm:h-48">
                  <img src={link.image} alt={link.alt} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" loading={index === 0 ? "eager" : "lazy"} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16080a]/70 via-[#16080a]/5 to-transparent" />
                  <span className="absolute bottom-3.5 left-4 text-2xl drop-shadow" aria-hidden="true">{link.icon}</span>
                </div>
                <div className="flex min-h-[78px] items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
                  <span className="min-w-0">
                    <span className="block font-serif text-[1.3rem] leading-tight text-[#4b1118]">{link.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-stone-600">{link.subtitle}</span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#c69b52]/55 text-[#8d632c] transition group-hover:border-[#4b1118] group-hover:bg-[#4b1118] group-hover:text-[#f0d38f]" aria-hidden="true">
                    <svg className="h-[17px] w-[17px]" viewBox="0 0 20 20" fill="none" focusable="false">
                      <path d="M5.75 14.25 14.2 5.8M6.5 5.75h7.75v7.75" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <footer className="mt-8 rounded-2xl border border-[#d6b56d]/45 bg-black/15 px-5 py-6 text-center shadow-[0_12px_32px_rgba(0,0,0,.16)] sm:mt-10 sm:px-8">
          <p className="font-serif text-xl text-[#f0d38f]">Come visit us</p>
          <a className="mt-2 inline-flex items-center gap-1.5 text-sm text-white/85 transition-colors hover:text-[#f0d38f]" href="https://maps.google.com/?q=67+Triq+il-Kbira,+Rabat,+Malta" target="_blank" rel="noreferrer">67 Triq il-Kbira · Rabat, Malta <ExternalLinkIcon /></a>
          <p className="mt-1 text-xs text-white/60">For reservations</p>
          <a className="mt-1 inline-block text-lg font-semibold tracking-wide text-[#f0d38f] hover:text-white" href="tel:+35677055218">+356 7705 5218</a>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d6b56d]/60 px-4 text-xs text-white transition-colors hover:bg-[#d6b56d] hover:text-[#351017]" href="https://www.facebook.com/profile.php?id=61581584915463" target="_blank" rel="noreferrer">
              <FacebookIcon className="h-4 w-4" /> Facebook
            </a>
            <a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d6b56d]/60 px-4 text-xs text-white transition-colors hover:bg-[#d6b56d] hover:text-[#351017]" href="https://wa.me/35677055218" target="_blank" rel="noreferrer">
              <WhatsAppIcon className="h-4 w-4" /> WhatsApp
            </a>
            <a className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[#d6b56d]/60 px-4 text-xs text-white transition-colors hover:bg-[#d6b56d] hover:text-[#351017]" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Open Instagram">
              <InstagramIcon className="h-4 w-4" /> Instagram
            </a>
          </div>
          <p className="mt-5 text-[10px] leading-5 text-white/45">© {new Date().getFullYear()} Palazzo San Paolo Brasserie</p>
        </footer>
      </div>
    </main>
  );
}
