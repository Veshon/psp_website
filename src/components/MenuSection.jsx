import MenuItemCard from "./MenuItemCard.jsx";
import MenuItemRow from "./MenuItemRow.jsx";

export default function MenuSection({ section, menuId }) {
  return (
    <section className=" scroll-mt-24 pb-5 pt-5 sm:pb-7 sm:pt-7" id={section.id}>
      <h2 className="mb-4 border-b border-palazzo-gold/35 pb-2 font-serif text-[1.4rem] leading-tight tracking-[-.02em] text-palazzo-gold-light sm:mb-5 sm:text-[1.8rem]">
        {section.title}
      </h2>

      {section.layout === "cards" ? (
        <div className="grid grid-cols-1 gap-2.5 sm:gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3 lg:gap-5">
          {section.items.map((item) => <MenuItemCard item={item} featured={menuId === "drinks"} key={item.name} />)}
        </div>
      ) : (
        <div className="divide-y divide-palazzo-line/70 sm:grid sm:grid-cols-2 sm:gap-x-9 sm:divide-y-0">
          {section.items.map((item) => <MenuItemRow item={item} key={item.name} />)}
        </div>
      )}

      {section.note && (
        <p className="mt-5 px-1 py-2 text-xs leading-5 text-palazzo-cream/65">
          {section.note}
        </p>
      )}
    </section>
  );
}
