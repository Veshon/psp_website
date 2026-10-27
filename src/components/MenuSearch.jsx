export default function MenuSearch({ value, onChange }) {
  return (
    <label className="mx-auto mb-5 block max-w-[460px] sm:mb-7">
      <span className="sr-only">Search this menu by item or ingredient</span>
      <span className="relative block">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-palazzo-gold-light" aria-hidden="true">⌕</span>
        <input
          className="min-h-12 w-full rounded-xl border border-palazzo-gold/40 bg-black/15 py-3 pl-11 pr-12 text-[13px] text-palazzo-cream outline-none transition placeholder:text-palazzo-cream/45 focus:border-palazzo-gold focus:bg-black/25 focus:ring-2 focus:ring-palazzo-gold/15 sm:py-3.5 sm:text-sm"
          type="search"
          placeholder="Search items or ingredients…"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        {value && (
          <button
            className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center text-lg text-palazzo-cream/65 hover:text-palazzo-gold-light"
            type="button"
            aria-label="Clear search"
            onClick={() => onChange("")}
          >
            ×
          </button>
        )}
      </span>
    </label>
  );
}
