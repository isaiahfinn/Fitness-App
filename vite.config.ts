import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// In production the app is served from GitHub Pages under /fitness-app/.
// In dev (including phone testing via --host) serve from root so the plain
// network URL works without having to append the base path — otherwise the
// root returns a 302 and the page can come up blank.
export default defineConfig(({ command }) => {
  const base = command === "build" ? "/fitness-app/" : "/";

  return {
    base,
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "apple-touch-icon.png"],
        manifest: {
          name: "Workout",
          short_name: "Workout",
          description: "Personal workout companion",
          theme_color: "#080C14",
          background_color: "#080C14",
          display: "standalone",
          orientation: "portrait",
          scope: base,
          start_url: base,
          icons: [
            { src: "pwa-192.png", sizes: "192x192", type: "image/png" },
            { src: "pwa-512.png", sizes: "512x512", type: "image/png" },
            {
              src: "pwa-512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable",
            },
          ],
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,woff,woff2}"],
        },
      }),
    ],
  };
});
