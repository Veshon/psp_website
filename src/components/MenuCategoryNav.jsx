export default function MenuCategoryNav({ sections }) {
  return (
    <nav className="flex justify-center menu-category-nav sticky top-0 z-10 mb-6 border-y border-palazzo-line/70 bg-palazzo-paper/95 py-2 backdrop-blur sm:mb-8 sm:py-3" aria-label="Jump to a menu section">
      <div className="flex min-w-0 gap-2 overflow-x-auto sm:gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            className="flex min-h-11 shrink-0 items-center rounded-full border border-palazzo-line/80 bg-white/70 px-3.5 text-[11px] text-palazzo-burgundy transition hover:border-palazzo-gold hover:bg-white hover:text-palazzo-gold-dark sm:px-4 sm:text-xs"
            href={`#${section.id}`}
          >
            <span className="whitespace-nowrap">{section.title}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
