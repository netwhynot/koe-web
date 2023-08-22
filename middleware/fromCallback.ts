import { useUserStore } from "@/stores/user";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.query.fromCallback !== undefined) {
    const sessionToken = useCookie("sessionToken");

    if (sessionToken.value === undefined) return await navigateTo("/");
    else {
      const userStore = useUserStore();

      await userStore.login();
      return await navigateTo("/");
    }
  }
});
