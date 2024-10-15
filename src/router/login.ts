export default [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/Login.vue"),
    meta: {
      layout: "Center",
      name: "Вход",
      typePage: "display",
    },
  },
];
