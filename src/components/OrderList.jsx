import { useEffect, useState } from "react";
import { WhatsAppIcon } from "./BrandIcons.jsx";

function Quantity({ item, onChange }) {
  return <div className="inline-flex items-center gap-2 rounded-full border border-palazzo-gold/40 bg-white px-1"><button type="button" onClick={() => onChange(item.id, -1)} aria-label={`Remove one ${item.name}`} className="grid h-8 w-8 place-items-center rounded-full text-lg text-palazzo-burgundy hover:bg-palazzo-cream">−</button><span className="min-w-4 text-center text-sm font-semibold tabular-nums">{item.quantity}</span><button type="button" onClick={() => onChange(item.id, 1)} aria-label={`Add one ${item.name}`} className="grid h-8 w-8 place-items-center rounded-full text-lg text-palazzo-burgundy hover:bg-palazzo-cream">+</button></div>;
}

export default function OrderList({ order, open, onOpen, onClose, onChange, onClear }) {
  const [tableNumber, setTableNumber] = useState(() => localStorage.getItem("palazzo-table-number") || "");
  const items = Object.values(order);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", closeOnEscape); document.body.style.overflow = ""; };
  }, [open, onClose]);

  const sendToWhatsApp = (event) => {
    event.preventDefault();
    const grouped = items.reduce((groups, item) => { (groups[item.menu] ||= []).push(item); return groups; }, {});
    const lines = Object.entries(grouped).flatMap(([menu, group]) => [menu, ...group.map((item) => `• ${item.quantity} × ${item.name}`), ""]);
    const message = [`Hello Palazzo San Paolo! I'd like to order from table ${tableNumber.trim()}:`, "", ...lines].join("\n").trim();
    window.open(`https://wa.me/35677055218?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  return <>
    <button type="button" onClick={onOpen} className="fixed bottom-4 right-4 z-30 flex min-h-14 items-center gap-3 rounded-full border border-palazzo-gold-light/70 bg-palazzo-burgundy px-5 text-sm font-semibold text-palazzo-cream shadow-[0_8px_28px_rgba(0,0,0,.4)] transition hover:-translate-y-0.5 hover:bg-[#5b1720] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palazzo-gold-light sm:bottom-6 sm:right-7" aria-label={`View order list, ${count} items`}>
      <span aria-hidden="true">☷</span><span>My order</span><span className="grid h-7 min-w-7 place-items-center rounded-full bg-palazzo-gold-light px-1.5 text-xs text-palazzo-burgundy">{count}</span>
    </button>

    {open && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-0 backdrop-blur-[2px] sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section role="dialog" aria-modal="true" aria-labelledby="order-title" className="flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-[24px] border border-palazzo-gold/50 bg-palazzo-paper shadow-2xl sm:rounded-[24px]">
        <header className="flex items-start justify-between gap-4 border-b border-palazzo-line px-5 py-5 sm:px-7">
          <div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-palazzo-gold-dark">Ready when you are</p><h2 id="order-title" className="mt-1 font-serif text-2xl text-palazzo-burgundy">Your order list</h2><p className="mt-1 text-xs text-stone-600">Show this list to your waiter when you’re ready.</p></div>
          <button type="button" onClick={onClose} aria-label="Close order list" className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl text-palazzo-burgundy hover:bg-palazzo-cream">×</button>
        </header>
        {items.length ? <>
          <div className="overflow-y-auto px-5 py-3 sm:px-7">
            {Object.entries(items.reduce((groups, item) => { (groups[item.menu] ||= []).push(item); return groups; }, {})).map(([menu, group]) => <div key={menu} className="py-3"><h3 className="mb-2 border-b border-palazzo-line pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-palazzo-gold-dark">{menu}</h3>{group.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 border-b border-palazzo-line/60 py-3 last:border-0"><div className="min-w-0"><p className="font-serif text-base leading-tight text-palazzo-burgundy">{item.name}</p><p className="mt-1 text-xs text-stone-500">{item.section} · {item.price}</p></div><Quantity item={item} onChange={onChange} /></div>)}</div>)}
          </div>
          <footer className="border-t border-palazzo-line bg-white/70 px-5 py-4 sm:px-7">
            <form onSubmit={sendToWhatsApp} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
              <label className="block text-xs font-semibold text-palazzo-ink">Table number <span className="text-palazzo-burgundy">*</span>
                <input required value={tableNumber} onChange={(event) => { setTableNumber(event.target.value); localStorage.setItem("palazzo-table-number", event.target.value); }} placeholder="Enter the number on your table" className="mt-1.5 min-h-11 w-full rounded-xl border border-palazzo-line bg-white px-3 text-sm font-normal outline-none transition placeholder:text-stone-400 focus:border-palazzo-gold-dark focus:ring-2 focus:ring-palazzo-gold/20" />
              </label>
              <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1f8f54] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#187343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f8f54] sm:w-auto sm:rounded-full sm:px-5 sm:text-sm"><WhatsAppIcon className="h-5 w-5 shrink-0" /><span>Send order on WhatsApp</span></button>
            </form>
            <div className="mt-3 flex items-center justify-between gap-3"><button type="button" onClick={onClear} className="min-h-9 px-2 text-xs text-stone-500 underline underline-offset-2 hover:text-palazzo-burgundy">Clear list</button><p className="text-right text-[10px] leading-4 text-stone-500">WhatsApp opens with your order ready. Tap Send there to place it.</p></div>
          </footer>
        </> : <div className="px-7 py-14 text-center"><span className="text-4xl text-palazzo-gold" aria-hidden="true">＋</span><p className="mt-3 font-serif text-xl text-palazzo-burgundy">Your list is empty</p><p className="mt-1 text-sm text-stone-600">Add dishes and drinks from any menu as you browse.</p><button type="button" onClick={onClose} className="mt-5 min-h-11 rounded-full bg-palazzo-burgundy px-6 text-sm font-semibold text-palazzo-cream">Browse menu</button></div>}
      </section>
    </div>}
  </>;
}
