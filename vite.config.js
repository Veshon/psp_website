import { resolve } from "node:path";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  esbuild: {
    jsx: "automatic",
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        food: resolve(import.meta.dirname, "food.html"),
        drinks: resolve(import.meta.dirname, "drinks.html"),
        iceCream: resolve(import.meta.dirname, "ice-cream-and-shakes.html"),
        menus: resolve(import.meta.dirname, "menus.html"),
      },
    },
  },
});
