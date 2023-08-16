// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "node:url";

export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Kyiv osu! Event | KOE",
      link: [{ rel: "icon", href: "/logo.svg" }],
    },
  },
  css: ["@/assets/styles/main.scss", "@/assets/styles/normalize.css"],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          // additionalData: '@import "@/assets/vars.scss";',
        },
      },
    },
  },
  alias: {
    "@": fileURLToPath(new URL("./", import.meta.url)),
  },
});
