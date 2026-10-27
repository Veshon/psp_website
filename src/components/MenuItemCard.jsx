export default function MenuItemCard({ item, featured = false }) {
  return (
    <article className={`flex min-w-0 overflow-hidden rounded-xl border border-palazzo-gold/30 bg-palazzo-paper text-palazzo-ink shadow-[0_6px_18px_rgba(0,0,0,.18)] transition-shadow hover:shadow-[0_10px_24px_rgba(0,0,0,.22)] md:border-palazzo-gold/40 ${featured ? "flex-row md:flex-col" : "flex-row md:flex-col"}`}>
      {item.image && (
        <div className={`relative shrink-0 overflow-hidden bg-palazzo-cream ${featured ? "h-[88px] w-[88px] md:aspect-[1.45] md:h-auto md:w-full" : "min-h-[96px] w-[78px] md:min-h-0 md:w-full"}`}>
          <img
            className={`absolute inset-0 h-full w-full object-cover ${featured ? "" : "md:relative md:aspect-[1.45]"}`}
            src={item.image}
            alt={item.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-3 sm:px-3.5 md:p-4 lg:p-[18px]">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-[15px] leading-snug text-palazzo-burgundy md:text-[17px] lg:text-[19px]">{item.name}</h3>
          <span className="shrink-0 font-serif text-sm font-semibold text-palazzo-gold-dark md:text-base">{item.price}</span>
        </div>
        {item.description && <p className="mt-1.5 text-[11px] leading-[1.45] text-stone-600 md:mt-2 md:text-[13px] md:leading-6">{item.description}</p>}
        {item.detail && <p className="mt-1.5 text-[10px] leading-[1.45] text-stone-500 md:mt-2 md:text-xs md:leading-5">{item.detail}</p>}
        {item.tag && <span className="mt-2 text-[8px] uppercase tracking-[.12em] text-palazzo-gold-dark md:mt-3 md:text-[9px]">{item.tag}</span>}
      </div>
    </article>
  );
}
