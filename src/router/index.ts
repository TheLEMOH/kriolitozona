import { createRouter, createWebHistory } from "vue-router";
import home from "./home.ts";
import experiment from "./experiment.ts";
import login from "./login.ts";
import user from "./user.ts";
import about from "./about.ts";
import contacts from "./contacts.ts";

const routes = [...home, ...experiment, ...login, ...user, ...about, ...contacts];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
