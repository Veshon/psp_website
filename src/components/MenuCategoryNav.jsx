export default function MenuCategoryNav({ sections }) {
  return (
    <nav className="menu-category-nav sticky top-0 z-10 mb-6 border-y border-palazzo-gold/25 bg-[#351017]/95 py-2 backdrop-blur sm:mb-8 sm:py-3" aria-label="Jump to a menu section">
      <div className="mx-auto flex min-w-0 justify-start gap-2 overflow-x-auto px-3 sm:justify-center sm:gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            className="flex min-h-11 shrink-0 items-center rounded-full border border-palazzo-gold/35 bg-white/5 px-3.5 text-[11px] text-palazzo-cream transition hover:border-palazzo-gold hover:bg-palazzo-gold hover:text-palazzo-burgundy sm:px-4 sm:text-xs"
            href={`#${section.id}`}
          >
            <span className="whitespace-nowrap">{section.title}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
