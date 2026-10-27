# Palazzo San Paolo Brasserie menus

React and Tailwind CSS project for the restaurant's food, drinks, and ice-cream menus.

## Project structure

```text
.
├── public/assets/                  # Restaurant images and logo served as static files
├── src/
│   ├── components/                 # Shared React UI components
│   ├── data/                       # Menu items and categories, one file per menu
│   ├── App.jsx                     # Assembles the active menu page
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind import and brand theme tokens
├── food.html                       # Food page entry point
├── drinks.html                     # Drinks page entry point
├── ice-cream-and-shakes.html       # Ice-cream page entry point
├── index.html                      # Default food page entry point
├── package.json
└── vite.config.js
```

## Run locally

Install dependencies once, then start the development server from this project folder:

```sh
npm install
npm run dev
```

Vite prints a local URL. The menu pages are available at `/food.html`, `/drinks.html`, and `/ice-cream-and-shakes.html`. Create a production build with `npm run build`.

Open the Vite URL in a browser; do not double-click an HTML file, because React's module imports need to be served by Vite. If the page stays on “Loading the menu…”, check the terminal for the Vite URL or startup error.

## Update the site

- **Change menu items, descriptions, or prices:** edit `src/data/food.js`, `src/data/drinks.js`, or `src/data/iceCream.js`. Keep real menu wording and prices as supplied by the restaurant.
- **Change reusable UI:** edit a component in `src/components/`. `MenuItemCard` and `MenuItemRow` render menu entries; `MenuSection` renders a category; the other components handle navigation, page branding, search, and the hero.
- **Change colors or fonts:** update the theme tokens in `src/index.css`.
- **Change a page's hero or introductory copy:** update that page's `hero`, `title`, or `description` in its data file.
- **Add the restaurant crest:** save it as `public/assets/palazzo-logo.png`. The header shows a monogram fallback until the file is present.

Menu photography currently uses Unsplash image URLs and needs an internet connection.
