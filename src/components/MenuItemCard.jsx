function QuantityControl({ item, quantity, onQuantityChange }) {
  if (quantity === 0) return <button type="button" onClick={() => onQuantityChange?.(item, 1)} className="mt-3 min-h-10 self-start rounded-full border border-palazzo-gold-dark/50 px-4 text-xs font-semibold text-palazzo-burgundy transition hover:bg-palazzo-burgundy hover:text-palazzo-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palazzo-gold-dark">Add to list</button>;
  return <div className="mt-3 inline-flex min-h-10 items-center gap-3 self-start rounded-full border border-palazzo-gold/50 bg-white/70 px-1.5" aria-label={`${item.name}, quantity ${quantity}`}><button type="button" onClick={() => onQuantityChange?.(item, -1)} aria-label={`Remove one ${item.name}`} className="grid h-8 w-8 place-items-center rounded-full text-lg text-palazzo-burgundy hover:bg-palazzo-cream">−</button><span className="min-w-4 text-center text-sm font-semibold tabular-nums">{quantity}</span><button type="button" onClick={() => onQuantityChange?.(item, 1)} aria-label={`Add one ${item.name}`} className="grid h-8 w-8 place-items-center rounded-full text-lg text-palazzo-burgundy hover:bg-palazzo-cream">+</button></div>;
}

export default function MenuItemCard({ item, quantity = 0, onQuantityChange }) {
  return (
    <article className="group flex min-h-[104px] min-w-0 flex-row overflow-hidden rounded-xl border border-palazzo-gold/30 bg-palazzo-paper text-palazzo-ink shadow-[0_6px_18px_rgba(0,0,0,.18)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,.24)] md:min-h-0 md:flex-col md:border-palazzo-gold/40">
      {item.image && (
        <div className="relative aspect-square w-[88px] shrink-0 overflow-hidden bg-palazzo-cream md:aspect-[1.45] md:w-full">
          <img
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
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
        <QuantityControl item={item} quantity={quantity} onQuantityChange={onQuantityChange} />
      </div>
    </article>
  );
}
