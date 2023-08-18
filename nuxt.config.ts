// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "node:url";

export default defineNuxtConfig({
  // devtools: { enabled: true },
  nitro: {
    preset: "node-server",
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "uk",
      },
      title: "Kyiv osu! Event | KOE",
      meta: [
        {
          name: "description",
          content: "Kyiv osu! Event Website",
        },
      ],
      link: [{ rel: "icon", href: "/logo.svg" }],
    },
  },
  css: ["@/assets/styles/normalize.css", "@/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/vars.scss";',
        },
      },
    },
  },
  alias: {
    "@": fileURLToPath(new URL("./", import.meta.url)),
  },
});
