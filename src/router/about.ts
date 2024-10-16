export default [
  {
    path: "/about",
    name: "about",
    component: () => import("../views/about/About.vue"),
    meta: {
      layout: "Default",
      name: "About",
      typePage: "display",
    },
  },
];
