import VueCountdown from "@chenfengyuan/vue-countdown";

export default defineNuxtPlugin({
  name: "countdown",
  enforce: "pre",
  setup(nuxtApp) {
    nuxtApp.vueApp.component(VueCountdown.name, VueCountdown);
  },
});
