export default function MenuItemRow({ item }) {
  return (
    <article className="flex min-w-0 items-center justify-between gap-3 py-3.5 sm:gap-4 sm:py-4">
      <div className="flex min-w-0 items-center gap-3">
        {item.image && <img className="h-14 w-16 shrink-0 object-cover sm:h-[64px] sm:w-[80px]" src={item.image} alt={item.alt} loading="lazy" decoding="async" />}
        <div className="min-w-0">
          <h3 className="font-serif text-[15px] leading-snug text-palazzo-burgundy sm:text-base">{item.name}</h3>
          {item.description && <p className="mt-1 text-[11px] leading-5 text-stone-600 sm:text-xs">{item.description}</p>}
          {item.detail && <p className="mt-1 text-xs leading-5 text-stone-500">{item.detail}</p>}
          {item.tag && <p className="mt-1 text-[10px] uppercase tracking-wider text-[#88662c]">{item.tag}</p>}
        </div>
      </div>
      <span className="shrink-0 font-serif text-[15px] font-semibold text-palazzo-gold-dark sm:text-base">{item.price}</span>
    </article>
  );
}
