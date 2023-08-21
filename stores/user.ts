import { defineStore } from "pinia";
import { IUserStore } from "@/interfaces/userStore.interface";

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      isLoggedIn: true,
      user: {},
      osuUser: {},
    }) as IUserStore,
  persist: true,
});
