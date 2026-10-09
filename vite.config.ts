import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const THEME_COLOR = "#18181b";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Cendas",
        short_name: "Cendas",
        start_url: "/",
        display: "standalone",
        background_color: THEME_COLOR,
        theme_color: THEME_COLOR,
        icons: [
          {
            src: "favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,webp}"],
      },
    }),
    {
      name: "inject-theme-color",
      transformIndexHtml: () => [
        {
          tag: "meta",
          attrs: { name: "theme-color", content: THEME_COLOR },
          injectTo: "head",
        },
      ],
    },
  ],
});
