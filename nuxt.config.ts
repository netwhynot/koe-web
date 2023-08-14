// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      title: "Kyiv Osu Event | KOE",
    },
  },
  css: ["assets/normalize.css", "assets/main.scss", "assets/variables.scss"],
});
