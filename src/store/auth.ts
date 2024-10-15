import { defineStore } from "pinia";

import UserInterface from "../models/user";
import { jwtDecode } from "jwt-decode";
import { LoginPost } from "../models/auth";
import { Post } from "../service/download";

import router from "../router/index";

interface State {
  client: UserInterface;
  isEntered: Boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): State => ({
    client: {},
    isEntered: false,
  }),

  actions: {
    async login(values: LoginPost) {
      const data = await Post("/api/auth/login", values).catch(() => {
        router.push({ name: "login" });
      });

      if (data) {
        const token = data.token;
        this.decodeAndSet(token);

        router.push({ name: "home" });
      } else {
        localStorage.removeItem("KRIO_SYSTEM");
        throw new Error("Неверный логин или пароль");
      }
    },

    decodeAndSet(token: string) {
      const decode: UserInterface = jwtDecode(token);
      this.client = decode;
      localStorage.setItem("KRIO_SYSTEM", token);
    },

    async refresh() {
      const oldToken = localStorage.getItem("KRIO_SYSTEM");

      const data = await Post("/api/auth/refresh", { token: oldToken }).catch(() => {
        router.push({ name: "login" });
      });

      if (data) {
        this.decodeAndSet(data.token);
      } else {
        localStorage.removeItem("KRIO_SYSTEM");

        router.push({ name: "login" });
      }
    },

    async quit() {
      localStorage.removeItem("KRIO_SYSTEM");

      router.push({ name: "login" });
    },
  },

  getters: {
    getClient: (state) => state.client,
  },
});
