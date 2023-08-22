import axios from "axios";
import { defineStore } from "pinia";
import { IUserStore } from "@/interfaces/userStore.interface";

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      isLoggedIn: false,
      user: {},
      osuUser: {},
    }) as IUserStore,
  actions: {
    async login() {
      const userFetch = await axios.get<IUserStore["user"]>("/api/users/me", {
        withCredentials: true,
      });

      if (userFetch.status !== 200) return;

      this.isLoggedIn = true;
      this.user = userFetch.data;
      this.osuUser = {
        id: userFetch.data.osuId,
        username: userFetch.data.username,
        avatar_url: `url('https://a.ppy.sh/${
          userFetch.data.osuId
        }?${new Date().getTime()}.jpeg')`,
      };
    },
  },
  persist: true,
});
