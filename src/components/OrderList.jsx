import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, firebaseConfigured } from "../firebase.js";

function Quantity({ item, onChange }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-palazzo-gold/40 bg-white px-1">
      <button
        type="button"
        onClick={() => onChange(item.id, -1)}
        aria-label={`Remove one ${item.name}`}
        className="grid h-8 w-8 place-items-center rounded-full text-lg text-palazzo-burgundy hover:bg-palazzo-cream"
      >
        −
      </button>
      <span className="min-w-4 text-center text-sm font-semibold tabular-nums">
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(item.id, 1)}
        aria-label={`Add one ${item.name}`}
        className="grid h-8 w-8 place-items-center rounded-full text-lg text-palazzo-burgundy hover:bg-palazzo-cream"
      >
        +
      </button>
    </div>
  );
}

function priceInEuros(price) {
  const match = String(price || "").match(/€\s*(\d+(?:[.,]\d{1,2})?)/);
  if (!match || /^\s*\+/.test(String(price))) return null;
  return Number(match[1].replace(",", "."));
}

function euro(value) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export default function OrderList({
  order,
  open,
  onOpen,
  onClose,
  onChange,
  onClear,
}) {
  const [tableNumber, setTableNumber] = useState(
    () => localStorage.getItem("palazzo-table-number") || "",
  );
  const [sending, setSending] = useState(false);
  const [submissionNotice, setSubmissionNotice] = useState(null);
  const items = Object.values(order);
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce(
    (sum, item) => sum + (priceInEuros(item.price) ?? 0) * item.quantity,
    0,
  );
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const sendOrder = async (event) => {
    event.preventDefault();
    if (!firebaseConfigured || !db) {
      setSubmissionNotice({ type: "error", title: "Order not sent", message: "Online ordering is not connected yet. Your basket is still here. Please ask a staff member for help." });
      return;
    }
    setSending(true); setSubmissionNotice(null);
    try {
      await addDoc(collection(db, "orders"), {
        tableNumber: tableNumber.trim(),
        items: items.map((item) => ({
          name: item.name, menu: item.menu, section: item.section,
          quantity: item.quantity, price: item.price,
          lineTotal: priceInEuros(item.price) === null ? null : priceInEuros(item.price) * item.quantity,
          comment: item.comment?.trim() || "",
        })),
        total,
        status: "new",
        createdAt: serverTimestamp(),
      });
      onClear();
      setSubmissionNotice({ type: "success", title: "Order sent", message: `Your order for table ${tableNumber.trim()} has been sent to the staff team.` });
    } catch (error) {
      setSubmissionNotice({
        type: "error",
        title: "Order not sent",
        message: error.code === "permission-denied"
          ? "The order could not be accepted by the restaurant system. Your basket is still here. Please ask a staff member for help."
          : "We couldn't reach the restaurant system. Check your connection and try again. Your basket is still here.",
      });
    } finally { setSending(false); }
  };

  return (
    <>
      <button
        type="button"
        onClick={onOpen}
        className="fixed bottom-4 right-4 z-30 flex min-h-14 items-center gap-3 rounded-full border border-palazzo-gold-light/70 bg-palazzo-burgundy px-5 text-sm font-semibold text-palazzo-cream shadow-[0_8px_28px_rgba(0,0,0,.4)] transition hover:-translate-y-0.5 hover:bg-[#5b1720] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-palazzo-gold-light sm:bottom-6 sm:right-7"
        aria-label={`View order list, ${count} items`}
      >
        <span aria-hidden="true">☷</span>
        <span>My order</span>
        <span className="grid h-7 min-w-7 place-items-center rounded-full bg-palazzo-gold-light px-1.5 text-xs text-palazzo-burgundy">
          {count}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-0 backdrop-blur-[2px] sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-title"
            className="flex max-h-[92dvh] w-full max-w-xl flex-col overflow-hidden rounded-t-[24px] border border-palazzo-gold/50 bg-palazzo-paper shadow-2xl sm:rounded-[24px]"
          >
            <header className="flex items-start justify-between gap-4 border-b border-palazzo-line px-5 py-5 sm:px-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[.2em] text-palazzo-gold-dark">
                  Ready when you are
                </p>
                <h2
                  id="order-title"
                  className="mt-1 font-serif text-2xl text-palazzo-burgundy"
                >
                  Your order list
                </h2>
                <p className="mt-1 text-xs text-stone-600">
                  Show this list to your waiter when you’re ready or just send
                  it.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close order list"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-xl text-palazzo-burgundy hover:bg-palazzo-cream"
              >
                ×
              </button>
            </header>
            {items.length ? (
              <>
                <div className="overflow-y-auto px-5 py-3 sm:px-7">
                  {Object.entries(
                    items.reduce((groups, item) => {
                      (groups[item.menu] ||= []).push(item);
                      return groups;
                    }, {}),
                  ).map(([menu, group]) => (
                    <div key={menu} className="py-3">
                      <h3 className="mb-2 border-b border-palazzo-line pb-2 text-[10px] font-bold uppercase tracking-[.16em] text-palazzo-gold-dark">
                        {menu}
                      </h3>
                      {group.map((item) => {
                        const unitPrice = priceInEuros(item.price);
                        return (
                          <div
                            key={item.id}
                            className="grid grid-cols-[1fr_auto] items-center gap-3 border-b border-palazzo-line/60 py-3 last:border-0"
                          >
                            <div className="min-w-0">
                              <p className="font-serif text-base leading-tight text-palazzo-burgundy">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-stone-500">
                                {item.section} · {item.price}
                              </p>
                              <p className="mt-1 text-xs font-semibold text-palazzo-burgundy">
                                {unitPrice === null
                                  ? "Price not included in total"
                                  : `${euro(unitPrice * item.quantity)}`}
                              </p>
                            </div>
                            <Quantity item={item} onChange={onChange} />
                            <label className="col-span-2 block text-xs font-medium text-stone-600">
                              Customize this item or add a comment
                              <textarea
                                value={item.comment || ""}
                                onChange={(event) =>
                                  onChange(item.id, 0, event.target.value)
                                }
                                rows={2}
                                placeholder="Add a comment..."
                                className="mt-1.5 min-h-16 w-full resize-y rounded-xl border border-palazzo-line bg-white px-3 py-2 text-sm font-normal text-palazzo-ink outline-none focus:border-palazzo-gold-dark focus:ring-2 focus:ring-palazzo-gold/20"
                              />
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
                <footer className="border-t border-palazzo-line bg-white/70 px-5 py-4 sm:px-7">
                  <div className="mb-3 flex items-center justify-between border-b border-palazzo-line pb-3">
                    <span className="font-serif text-lg text-palazzo-burgundy">
                      Total
                    </span>
                    <strong className="text-xl tabular-nums text-palazzo-burgundy">
                      {euro(total)}
                    </strong>
                  </div>
                  <form
                    onSubmit={sendOrder}
                    className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end"
                  >
                    <label className="block text-xs font-semibold text-palazzo-ink">
                      Table number{" "}
                      <span className="text-palazzo-burgundy">*</span>
                      <input
                        id="order-table-number"
                        required
                        value={tableNumber}
                        onChange={(event) => {
                          setTableNumber(event.target.value);
                          localStorage.setItem(
                            "palazzo-table-number",
                            event.target.value,
                          );
                        }}
                        placeholder="Enter the number on your table"
                        className="mt-1.5 min-h-11 w-full rounded-xl border border-palazzo-line bg-white px-3 text-sm font-normal outline-none transition placeholder:text-stone-400 focus:border-palazzo-gold-dark focus:ring-2 focus:ring-palazzo-gold/20"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#1f8f54] px-4 text-[13px] font-semibold text-white shadow-sm transition hover:bg-[#187343] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f8f54] sm:w-auto sm:rounded-full sm:px-5 sm:text-sm"
                    >
                      <span>{sending ? "Sending…" : "Place order"}</span>
                    </button>
                  </form>
                  {!firebaseConfigured && <p className="mt-2 text-xs text-amber-800">Online ordering is not connected yet. Ask a staff member to take your order.</p>}
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={onClear}
                      className="min-h-9 rounded-[100px] bg-red-700 px-2 text-xs text-white hover:bg-red-800"
                    >
                      Clear list
                    </button>
                    <p className="text-right text-[10px] leading-4 text-stone-500">Your order will appear on the staff order screen.</p>
                  </div>
                </footer>
              </>
            ) : (
              <div className="px-7 py-14 text-center">
                <span className="text-4xl text-palazzo-gold" aria-hidden="true">
                  ＋
                </span>
                <p className="mt-3 font-serif text-xl text-palazzo-burgundy">
                  Your list is empty
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  Add dishes and drinks from any menu as you browse.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-5 min-h-11 rounded-full bg-palazzo-burgundy px-6 text-sm font-semibold text-palazzo-cream"
                >
                  Browse menu
                </button>
              </div>
            )}
          </section>
        </div>
      )}
      {submissionNotice && <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4">
        <section role={submissionNotice.type === "error" ? "alertdialog" : "dialog"} aria-modal="true" aria-labelledby="order-notice-title" aria-describedby="order-notice-message" className="w-full max-w-sm rounded-3xl border border-palazzo-gold/50 bg-palazzo-paper p-6 text-center shadow-2xl sm:p-8">
          <div className={`mx-auto grid h-14 w-14 place-items-center rounded-full text-2xl ${submissionNotice.type === "success" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"}`} aria-hidden="true">{submissionNotice.type === "success" ? "✓" : "!"}</div>
          <h2 id="order-notice-title" className="mt-4 font-serif text-2xl text-palazzo-burgundy">{submissionNotice.title}</h2>
          <p id="order-notice-message" className="mt-2 text-sm leading-6 text-stone-600">{submissionNotice.message}</p>
          {submissionNotice.type === "success" ? <button type="button" autoFocus onClick={() => { setSubmissionNotice(null); onClose(); }} className="mt-6 min-h-12 w-full rounded-full bg-palazzo-burgundy px-5 text-sm font-semibold text-palazzo-cream hover:bg-[#5b1720]">Done</button> : <button type="button" autoFocus onClick={() => setSubmissionNotice(null)} className="mt-6 min-h-12 w-full rounded-full bg-palazzo-burgundy px-5 text-sm font-semibold text-palazzo-cream hover:bg-[#5b1720]">Back to my order</button>}
        </section>
      </div>}
    </>
  );
}
