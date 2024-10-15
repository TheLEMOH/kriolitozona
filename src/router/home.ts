export default [
  {
    path: "/",
    name: "home",
    component: () => import("../views/home/Home.vue"),
    meta: {
      layout: "Default",
      name: "Домашняя страница",
      typePage: "create",
    },
  },
];
