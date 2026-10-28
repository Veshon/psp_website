export default function MenuItemRow({ item, quantity = 0, onQuantityChange }) {
  return (
    <article className="flex min-w-0 items-center justify-between gap-3 border-b border-palazzo-gold/20 py-3.5 sm:gap-4 sm:py-4">
      <div className="flex min-w-0 items-center gap-3">
        {item.image && <img className="h-16 w-16 shrink-0 rounded-lg object-cover shadow-sm sm:h-[72px] sm:w-[72px]" src={item.image} alt={item.alt} loading="lazy" decoding="async" />}
        <div className="min-w-0">
          <h3 className="font-serif text-[15px] leading-snug text-palazzo-cream sm:text-base">{item.name}</h3>
          {item.description && <p className="mt-1 text-[11px] leading-5 text-palazzo-cream/70 sm:text-xs">{item.description}</p>}
          {item.detail && <p className="mt-1 text-xs leading-5 text-palazzo-cream/55">{item.detail}</p>}
          {item.tag && <p className="mt-1 text-[10px] uppercase tracking-wider text-palazzo-gold-light">{item.tag}</p>}
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2"><span className="font-serif text-[15px] font-semibold text-palazzo-gold-light sm:text-base">{item.price}</span>{quantity === 0 ? <button type="button" onClick={() => onQuantityChange?.(item, 1)} className="min-h-9 rounded-full border border-palazzo-gold/50 px-3 text-[11px] text-palazzo-cream hover:bg-palazzo-gold hover:text-palazzo-burgundy">Add</button> : <div className="inline-flex min-h-9 items-center gap-2 rounded-full border border-palazzo-gold/50 px-1"><button type="button" onClick={() => onQuantityChange?.(item, -1)} aria-label={`Remove one ${item.name}`} className="grid h-7 w-7 place-items-center rounded-full text-lg text-palazzo-cream">−</button><span className="min-w-3 text-center text-xs tabular-nums">{quantity}</span><button type="button" onClick={() => onQuantityChange?.(item, 1)} aria-label={`Add one ${item.name}`} className="grid h-7 w-7 place-items-center rounded-full text-lg text-palazzo-cream">+</button></div>}</div>
    </article>
  );
}
