// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath, URL } from "node:url";

export default defineNuxtConfig({
  // devtools: { enabled: true },
  runtimeConfig: {
    mongoose: {
      url: process.env.NUXT_MONGOOSE_URL,
    },
  },
  nitro: {
    preset: "node-server",
    compressPublicAssets: true,
    plugins: ["~/server/index.ts"],
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
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "og:title",
          content: "Kyiv osu! Event | KOE",
        },
        {
          name: "og:description",
          content: "Kyiv osu! Event Website",
        },
        {
          name: "og:image",
          content: "https://kyivosuevent.com/logo.svg",
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
          additionalData: `
           @import "@/assets/styles/vars.scss";
           @import "@/assets/styles/mixins.scss";
          `,
        },
      },
    },
  },
  alias: {
    "@": fileURLToPath(new URL("./", import.meta.url)),
  },
});
