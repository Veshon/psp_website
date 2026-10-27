import { useState } from "react";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import MenuHero from "./components/MenuHero.jsx";
import MenuSection from "./components/MenuSection.jsx";
import MenuCategoryNav from "./components/MenuCategoryNav.jsx";
import MenuSearch from "./components/MenuSearch.jsx";
import food from "./data/food.js";
import drinks from "./data/drinks.js";
import iceCream from "./data/iceCream.js";

const menus = { food, drinks, iceCream };

export default function App() {
  const menuId = document.getElementById("root")?.dataset.menu || "food";
  const menu = menus[menuId] || food;
  const [query, setQuery] = useState("");
  const needle = query.trim().toLowerCase();
  const sections = needle
    ? menu.sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          [item.name, item.price, item.description, item.detail, item.tag, item.search]
            .filter(Boolean)
            .join(" ")
            .toLowerCase()
            .includes(needle),
        ),
      }))
      .filter((section) => section.items.length > 0)
    : menu.sections;

  return (
    <div className="min-h-screen bg-palazzo-paper text-palazzo-ink">
      <SiteHeader activePage={menu.id} />
      <MenuHero {...menu.hero} />

      <main id="menu" className="mx-auto max-w-[1320px] px-4 pb-16 pt-7 sm:px-7 sm:pb-20 sm:pt-14 lg:px-10">
        <section className="mx-auto mb-6 max-w-3xl px-2 text-center sm:mb-8 sm:px-4">
          <h2 className="font-serif text-[1.8rem] leading-tight tracking-[-.025em] text-palazzo-burgundy sm:text-[2.8rem]">{menu.title}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-[12px] leading-5 text-stone-600 sm:mt-3 sm:text-sm sm:leading-7">{menu.description}</p>
          <div className="mx-auto mt-5 h-px w-12 bg-palazzo-gold/70" />
        </section>

        <MenuSearch value={query} onChange={setQuery} />
        <MenuCategoryNav sections={sections} />

        {sections.length ? (
          sections.map((section, index) => <MenuSection key={section.id} section={section} index={index} />)
        ) : (
          <p className="border border-palazzo-line bg-white px-5 py-12 text-center font-serif text-lg text-stone-600">No menu items match “{query}”.</p>
        )}
      </main>
      <SiteFooter activePage={menu.id} />
    </div>
  );
}
