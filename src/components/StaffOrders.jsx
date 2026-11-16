import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, onSnapshot, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { auth, db, firebaseConfigured } from "../firebase.js";

const money = (amount) => new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" }).format(amount || 0);
const closedStatuses = new Set(["served", "paid", "cancelled"]);
const receiptMenuOrder = (menu) => {
  const name = String(menu || "").toLowerCase();
  if (name.includes("drink")) return 0;
  if (name.includes("ice") || name.includes("shake")) return 1;
  if (name.includes("food")) return 2;
  if (name.includes("dessert")) return 3;
  return 4;
};
const receiptMenuLabel = (menu) => {
  const name = String(menu || "");
  const order = receiptMenuOrder(name);
  if (order === 0) return "Drinks";
  if (order === 1) return "Ice-Cream & Shakes";
  if (order === 2) return "Food";
  if (order === 3) return "Desserts";
  return name || "Other items";
};
const groupOrderItems = (items = []) => {
  const groups = new Map();
  items.forEach((item, index) => {
    const menu = item.menu || "Other items";
    if (!groups.has(menu)) groups.set(menu, []);
    groups.get(menu).push({ ...item, originalIndex: index });
  });
  return [...groups.entries()]
    .sort(([a], [b]) => receiptMenuOrder(a) - receiptMenuOrder(b))
    .map(([menu, menuItems]) => ({
      menu,
      label: receiptMenuLabel(menu),
      items: menuItems.sort((a, b) => {
        const aSmoothie = /smoothie/i.test(`${a.name || ""} ${a.section || ""}`) ? 0 : 1;
        const bSmoothie = /smoothie/i.test(`${b.name || ""} ${b.section || ""}`) ? 0 : 1;
        return aSmoothie - bSmoothie || a.originalIndex - b.originalIndex;
      }),
    }));
};
const buildReceiptPdf = async (order) => {
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "b5" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;
  const right = pageWidth - margin;
  let y = 15;
  const rule = () => { pdf.setDrawColor(75); pdf.setLineWidth(0.25); pdf.line(margin, y, right, y); y += 5; };
  const ensureSpace = (height) => {
    if (y + height < pageHeight - 15) return;
    pdf.addPage("b5", "portrait");
    y = 16;
    pdf.setFont("helvetica", "bold"); pdf.setFontSize(11);
    pdf.text(`GUEST BILL · TABLE ${order.tableNumber} · CONTINUED`, margin, y);
    y += 7; rule();
  };

  pdf.setFont("helvetica", "bold"); pdf.setFontSize(19);
  pdf.text("BRASSERIE", pageWidth / 2, y, { align: "center" }); y += 6;
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(15);
  pdf.text("PALAZZO SAN PAOLO", pageWidth / 2, y, { align: "center" }); y += 6;
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  pdf.text("67 Triq il-Kbira · Rabat, Malta", pageWidth / 2, y, { align: "center" }); y += 5;
  pdf.text("+356 7705 5218", pageWidth / 2, y, { align: "center" }); y += 6;
  pdf.setFont("helvetica", "bold"); pdf.setFontSize(12);
  pdf.text("GUEST BILL", pageWidth / 2, y, { align: "center" }); y += 7;
  rule();
  y =+ 55;

  pdf.setFont("helvetica", "bold"); pdf.setFontSize(17);
  pdf.text(`TABLE ${order.tableNumber}`, margin, y); y += 8;
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  const created = order.createdAt?.toDate?.();
  pdf.text(`Date & time: ${created ? created.toLocaleString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "Unavailable"}`, margin, y); y += 5;
  pdf.text(`Order ref: #${order.id.slice(-6).toUpperCase()}`, margin, y); y += 5;
  rule();

  const groups = Object.entries((order.items || []).reduce((all, item) => {
    const menu = item.menu || "Other items";
    (all[menu] ||= []).push(item);
    return all;
  }, {})).sort(([a], [b]) => receiptMenuOrder(a) - receiptMenuOrder(b));

  for (const [menu, items] of groups) {
    ensureSpace(15);
    // pdf.setFillColor(238, 235, 228); pdf.rect(margin, y - 4, contentWidth, 9, "F");
    pdf.setFont("helvetica", "normal"); pdf.setFontSize(12);
    pdf.text(receiptMenuLabel(menu).toUpperCase(), margin + 2, y + 2); y += 9;
    for (const item of items) {
      pdf.setFont("helvetica", "normal"); pdf.setFontSize(11);
      const description = pdf.splitTextToSize(`${item.quantity} × ${item.name}`, contentWidth - 38);
      const amount = item.lineTotal == null ? `${item.price} each` : money(item.lineTotal);
      ensureSpace(Math.max(description.length * 5 + 4, 10));
      pdf.text(description, margin + 2, y);
      pdf.setFont("helvetica", "bold"); pdf.text(String(amount), right - 2, y, { align: "right" });
      y += description.length * 5;
      if (item.comment) {
        pdf.setFont("helvetica", "bold"); pdf.setFontSize(10);
        const note = pdf.splitTextToSize(`Note: ${item.comment}`, contentWidth - 12);
        ensureSpace(note.length * 4.5 + 2);
        pdf.text(note, margin + 7, y);
        y += note.length * 7;
      }
      // pdf.setDrawColor(190); pdf.setLineWidth(0.15); pdf.line(margin + 2, y + 1, right - 2, y + 1); y += 4;
    }
  }

  ensureSpace(25); rule();
  pdf.setFont("helvetica", "bold"); pdf.setFontSize(14);
  y += 5;
  pdf.text("TOTAL", margin, y); pdf.setFontSize(19); pdf.text(money(order.total), right, y, { align: "right" }); y += 11;
  pdf.setFont("helvetica", "normal"); pdf.setFontSize(10);
  pdf.text("Payment:   [ ] Cash     [ ] Card      [ ] Revolut", margin, y); y += 12;
  pdf.setFontSize(11); pdf.text("Thank you for dining with us!", pageWidth / 2, y, { align: "center" });
  return pdf.output("blob");
};
const statusStyles = {
  new: "border-amber-300 bg-amber-50 text-amber-900",
  preparing: "border-blue-300 bg-blue-50 text-blue-900",
  served: "border-emerald-300 bg-emerald-50 text-emerald-900",
  paid: "border-violet-300 bg-violet-50 text-violet-900",
  cancelled: "border-stone-300 bg-stone-100 text-stone-700",
};

export default function StaffOrders() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [connectionState, setConnectionState] = useState("offline");
  const [activeFilter, setActiveFilter] = useState("all");
  const [search, setSearch] = useState("");
  const audioContextRef = useRef(null);

  useEffect(() => {
    const unlockAudio = () => {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      audioContextRef.current ||= new AudioContextClass();
      if (audioContextRef.current.state === "suspended") audioContextRef.current.resume().catch(() => {});
    };
    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    return () => {
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      audioContextRef.current?.close();
      audioContextRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (!user || !db) { setOrders([]); setConnectionState("offline"); return undefined; }
    setConnectionState("connecting");
    let firstSnapshot = true;
    return onSnapshot(query(collection(db, "orders"), orderBy("createdAt", "desc")),
      (snapshot) => {
        const isNewOrder = !firstSnapshot && snapshot.docChanges().some((change) => change.type === "added");
        firstSnapshot = false;
        setOrders(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })));
        setError("");
        setConnectionState("live");
        if (isNewOrder) playOrderAlert(audioContextRef.current);
      },
      (reason) => { setError(reason.message || "Could not load orders."); setConnectionState("error"); },
    );
  }, [user]);

  const login = async (event) => {
    event.preventDefault(); setError("");
    try { await signInWithEmailAndPassword(auth, email.trim(), password); }
    catch { setError("Sign-in failed. Check the staff email and password."); }
  };

  const changeStatus = (order, status) => {
    updateDoc(doc(db, "orders", order.id), { status })
      .catch((reason) => setError(reason.message || "Could not update order status."));
  };

  const printOrder = async (order) => {
    // Open the tab in the click gesture so browsers don't block the generated B5 PDF.
    const receiptTab = window.open("about:blank", "_blank");
    if (!receiptTab) {
      setError("Your browser blocked the receipt PDF. Allow pop-ups for this site and try again.");
      return;
    }
    try {
      receiptTab.document.write("<!doctype html><title>Preparing receipt</title><p style='font:16px Arial;padding:24px'>Preparing B5 receipt…</p>");
      const blob = await buildReceiptPdf(order);
      const receiptUrl = URL.createObjectURL(blob);
      receiptTab.location.href = receiptUrl;
      window.setTimeout(() => URL.revokeObjectURL(receiptUrl), 120000);
    } catch {
      receiptTab.close();
      setError("Could not create the receipt PDF. Please try again.");
    }
  };

  if (!firebaseConfigured) return <Shell><h1 className="font-serif text-3xl">Staff orders</h1><p className="mt-3 text-sm">Firebase is not configured yet. Follow the setup steps in README.md.</p></Shell>;
  if (!user) return <Shell><h1 className="font-serif text-3xl">Staff orders</h1><p className="mt-2 text-sm text-stone-600">Sign in with a staff account to view incoming orders.</p><form onSubmit={login} className="mt-6 grid gap-3"><input required type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Staff email" className="min-h-12 rounded-xl border px-4"/><input required type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="min-h-12 rounded-xl border px-4"/><button className="min-h-12 rounded-xl bg-[#51131b] text-white">Sign in</button></form>{error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}</Shell>;

  const activeOrders = orders.filter((order) => !closedStatuses.has(order.status || "new"));
  const servedOrders = orders.filter((order) => order.status === "served");
  const paidOrders = orders.filter((order) => order.status === "paid");
  const cancelledOrders = orders.filter((order) => order.status === "cancelled");
  const newCount = activeOrders.filter((order) => (order.status || "new") === "new").length;
  const visibleActiveOrders = activeOrders.filter((order) => {
    const statusMatches = activeFilter === "all" || (order.status || "new") === activeFilter;
    const haystack = [order.tableNumber, ...(order.items || []).flatMap((item) => [item.name, item.menu, item.comment])].join(" ").toLowerCase();
    return statusMatches && haystack.includes(search.trim().toLowerCase());
  });

  return (
    <main className="staff-orders min-h-screen bg-[#f6f1e6] px-4 py-5 text-[#261b17] sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <header className="staff-no-print flex flex-wrap items-center justify-between gap-4 border-b border-[#c69b52]/50 pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#8d632c]">Palazzo San Paolo Brasserie</p>
            <h1 className="mt-1 font-serif text-3xl sm:text-4xl">Live orders</h1>
          </div>
          <button onClick={() => signOut(auth)} className="min-h-10 rounded-full border border-[#8d632c]/40 bg-white px-4 text-sm font-medium hover:bg-[#fbf8f0]">Sign out</button>
        </header>

        <div className="staff-no-print flex flex-wrap items-center justify-between gap-2 py-4 text-sm text-stone-600">
          <p>Signed in as <span className="font-medium text-[#261b17]">{user.email}</span></p>
          <div className="flex items-center gap-4"><span className="inline-flex items-center gap-2" aria-live="polite"><span className={`h-2.5 w-2.5 rounded-full ${connectionState === "live" ? "bg-emerald-500" : connectionState === "error" ? "bg-red-500" : "bg-amber-400"}`} />{connectionState === "live" ? "Live updates on" : connectionState === "connecting" ? "Connecting…" : connectionState === "error" ? "Connection issue" : "Offline"}</span></div>
        </div>

        {error && <p role="alert" className="staff-no-print mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">{error}</p>}

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-[#c69b52]/35 bg-white px-6 py-12 text-center shadow-sm">
            <span className="text-3xl" aria-hidden="true">☷</span>
            <h2 className="mt-2 font-serif text-2xl">No orders yet</h2>
            <p className="mt-1 text-sm text-stone-600">New customer orders will appear here automatically.</p>
          </div>
        ) : (
          <>
            <section aria-labelledby="active-orders-title">
              <div className="staff-no-print mb-3 flex items-end justify-between gap-3">
                <div><h2 id="active-orders-title" className="font-serif text-2xl">Active orders</h2></div>
                {newCount > 0 && <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">{newCount} need{newCount === 1 ? "s" : ""} attention</span>}
              </div>
              <div className="staff-no-print mb-4 grid gap-3 rounded-2xl border border-[#c69b52]/35 bg-white p-3 sm:grid-cols-[1fr_auto] sm:items-center sm:p-4">
                <label className="relative block"><span className="sr-only">Search active orders</span><span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden="true">⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search table, dish, or note" className="min-h-11 w-full rounded-xl border border-stone-200 bg-[#fbfaf7] pl-9 pr-3 text-sm outline-none focus:border-[#8d632c] focus:ring-2 focus:ring-[#c69b52]/25" /></label>
                <div className="flex gap-1 rounded-xl bg-[#f6f1e6] p-1" role="group" aria-label="Filter active orders">
                  {[ ["all", `All (${activeOrders.length})`], ["new", `New (${newCount})`], ["preparing", `Preparing (${activeOrders.length - newCount})`] ].map(([value, label]) => <button key={value} type="button" aria-pressed={activeFilter === value} onClick={() => setActiveFilter(value)} className={`min-h-9 flex-1 rounded-lg px-3 text-xs font-semibold transition sm:flex-none ${value === "new" && newCount > 1 ? "animate-pulse bg-red-600 text-white shadow-md shadow-red-900/20 hover:bg-red-700" : activeFilter === value ? "bg-[#51131b] text-white shadow-sm" : "text-stone-600 hover:bg-white"}`}>{label}</button>)}
                </div>
              </div>
              {activeOrders.length === 0 ? <p className="staff-no-print rounded-xl border border-dashed border-[#c69b52]/50 bg-white/60 p-6 text-center text-sm text-stone-600">All caught up. There are no active orders.</p> : visibleActiveOrders.length === 0 ? <p className="staff-no-print rounded-xl border border-dashed border-[#c69b52]/50 bg-white/60 p-6 text-center text-sm text-stone-600">No orders match this filter. Try another status or search.</p> : <div className="grid items-start gap-4 lg:grid-cols-2">{visibleActiveOrders.map((order) => <OrderCard key={order.id} order={order} onPrint={() => printOrder(order)} onStatusChange={changeStatus} />)}</div>}
            </section>

            <OrderSection title="Served orders" count={servedOrders.length} hint="Waiting for payment" empty="Served orders will appear here." className="mt-8" orders={servedOrders} printOrder={printOrder} changeStatus={changeStatus} actionLabel="Mark as paid" actionStatus="paid" />
            <OrderSection title="Paid orders" count={paidOrders.length} hint="Payment complete" empty="Paid orders will appear here." className="mt-4" orders={paidOrders} printOrder={printOrder} changeStatus={changeStatus} />
            {cancelledOrders.length > 0 && <OrderSection title="Cancelled orders" count={cancelledOrders.length} empty="" className="mt-4" orders={cancelledOrders} printOrder={printOrder} changeStatus={changeStatus} />}
          </>
        )}
      </div>
    </main>
  );
}

function OrderSection({ title, count, hint, empty, className = "", orders, printOrder, changeStatus, actionLabel, actionStatus }) {
  return <details className={`staff-no-print overflow-hidden rounded-2xl border border-stone-300 bg-white/70 ${className}`}>
    <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 hover:bg-white [&::-webkit-details-marker]:hidden">
      <span><span className="font-serif text-xl">{title}</span>{hint && <span className="ml-2 text-sm text-stone-500">{hint}</span>}</span>
      <span className="flex items-center gap-2"><span className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-700">{count}</span><span className="text-lg text-stone-500" aria-hidden="true">⌄</span></span>
    </summary>
    <div className="border-t border-stone-200 p-4">
      {orders.length === 0 ? <p className="py-4 text-center text-sm text-stone-500">{empty}</p> : <div className="grid items-start gap-4 lg:grid-cols-2">{orders.map((order) => <OrderCard key={order.id} order={order} onPrint={() => printOrder(order)} onStatusChange={changeStatus} actionLabel={actionLabel} actionStatus={actionStatus} />)}</div>}
    </div>
  </details>;
}

function OrderCard({ order, onPrint, onStatusChange, actionLabel, actionStatus }) {
  const status = order.status || "new";
  const created = order.createdAt?.toDate?.();
  const itemGroups = groupOrderItems(order.items || []);
  return (
    <article className="staff-order-card rounded-2xl border border-[#c69b52]/40 bg-white p-4 shadow-sm sm:p-5">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-stone-100 pb-3">
        <div>
          <div className="flex flex-wrap items-center gap-2"><h3 className="font-serif text-2xl leading-tight">Table {order.tableNumber}</h3><span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize ${statusStyles[status] || statusStyles.new}`}>{status}</span></div>
          <p className="mt-1 text-xs text-stone-500">{created ? created.toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }) : "Just received"}</p>
        </div>
        <div className="staff-no-print flex items-center gap-2">
          {status === "new" || status === "preparing" ? <><label className="sr-only" htmlFor={`status-${order.id}`}>Change status for table {order.tableNumber}</label><select id={`status-${order.id}`} value={status} onChange={(event) => onStatusChange(order, event.target.value)} className="min-h-10 rounded-full border border-stone-300 bg-white px-3 text-sm focus:border-[#8d632c] focus:outline-none focus:ring-2 focus:ring-[#c69b52]/30"><option value="new">New</option><option value="preparing">Preparing</option><option value="cancelled">Cancelled</option></select><button type="button" onClick={() => onStatusChange(order, "served")} className="min-h-10 rounded-full bg-emerald-700 px-3 text-sm font-semibold text-white hover:bg-emerald-800">Mark served</button></> : actionLabel && <button type="button" onClick={() => onStatusChange(order, actionStatus)} className="min-h-10 rounded-full bg-[#51131b] px-3 text-sm font-semibold text-white hover:bg-[#6b1b26]">{actionLabel}</button>}
          <button type="button" onClick={onPrint} className="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-[#8d632c]/40 px-3 text-sm font-medium text-[#51131b] hover:bg-[#fbf8f0]" aria-label={`Open B5 receipt PDF for table ${order.tableNumber}`}><span aria-hidden="true">⎙</span><span className="hidden sm:inline">Print</span></button>
        </div>
      </header>
      <div className="divide-y divide-stone-100">{itemGroups.map((group) => <section key={group.menu} className="py-2" aria-label={group.label}><h4 className="pb-1 text-xs font-semibold uppercase tracking-[.12em] text-[#8d632c]">{group.label}</h4><ul className="divide-y divide-stone-100">{group.items.map((item, index) => <li key={`${item.name}-${item.originalIndex ?? index}`} className="py-3"><div className="flex justify-between gap-3 text-sm"><span className="min-w-0"><strong className="mr-1 tabular-nums">{item.quantity} ×</strong>{item.name}</span><span className="shrink-0 text-right">{item.lineTotal == null ? item.price : money(item.lineTotal)}</span></div>{item.comment && <p className="mt-1 pl-6 text-xs text-stone-600"><strong>Note:</strong> {item.comment}</p>}</li>)}</ul></section>)}</div>
      <footer className="flex items-center justify-between border-t border-stone-200 pt-3 text-sm"><span className="text-xs text-stone-500">{order.items?.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0) || 0} item(s)</span><span className="font-semibold">Total <span className="ml-1 text-base">{money(order.total)}</span></span></footer>
    </article>
  );
}

function Shell({ children }) { return <main className="grid min-h-screen place-items-center bg-[#f6f1e6] px-5 text-[#261b17]"><section className="w-full max-w-md rounded-2xl border border-[#c69b52]/50 bg-white p-7 shadow-lg">{children}</section></main>; }
