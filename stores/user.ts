import { defineStore } from "pinia";
import { IUserState } from "../interfaces/user.interface";

export const useUserStore = defineStore("user", {
  state: () =>
    ({
      isLoggedIn: true,
      user: {},
    }) as IUserState,
});
