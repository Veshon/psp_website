import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function FoodImage({ item, className, imageClassName = "" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`View ${item.name} image`} className={`block cursor-zoom-in ${className}`}>
      <img className={`h-full w-full object-contain ${imageClassName}`} src={item.image} alt={item.alt || item.name} loading="lazy" decoding="async" />
    </button>
    {open && createPortal(
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-8" role="presentation" onClick={() => setOpen(false)}>
        <div role="dialog" aria-modal="true" aria-label={`${item.name} image`} className="relative flex max-h-full max-w-full items-center justify-center" onClick={(event) => event.stopPropagation()}>
          <button type="button" autoFocus onClick={() => setOpen(false)} className="absolute right-2 top-2 z-10 rounded-full bg-palazzo-paper px-4 py-2 text-sm font-semibold text-palazzo-burgundy shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-palazzo-gold" aria-label="Close image">X</button>
          <img className="max-h-[92vh] max-w-[96vw] object-contain sm:max-h-[90vh] sm:max-w-[92vw]" src={item.image} alt={item.alt || item.name} />
        </div>
      </div>,
      document.body,
    )}
  </>;
}
