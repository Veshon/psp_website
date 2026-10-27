export default function MenuItemCard({ item }) {
  return (
    <article className="flex min-w-0 flex-row border-b border-palazzo-line/75 bg-transparent md:flex-col md:border md:bg-white">
      {item.image && (
        <div className="relative min-h-[96px] w-[78px] shrink-0 overflow-hidden md:min-h-0 md:w-full">
          <img
            className="absolute inset-0 h-full w-full object-cover md:relative md:aspect-[1.45]"
            src={item.image}
            alt={item.alt}
            loading="lazy"
            decoding="async"
          />
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col justify-center px-3 py-3 md:p-4 lg:p-[18px]">
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
