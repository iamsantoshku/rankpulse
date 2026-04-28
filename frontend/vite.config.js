// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })




import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",

      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],

      manifest: {
        name: "RankPulse - Test Series Platform",
        short_name: "RankPulse",
        description: "Practice mock tests like Testbook",
        theme_color: "#2563eb",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",

        icons: [
          {
            src: "/icons/pwa-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/icons/pwa-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/.*\/api\/.*$/,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
            },
          },
        ],
      },
    }),
  ],
});