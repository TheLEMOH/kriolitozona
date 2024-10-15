export default [
  {
    path: "/experiment/create",
    name: "experimentCreate",
    component: () => import("../views/experiment/Create.vue"),
    meta: {
      layout: "Default",
      name: "Добавление нового эксперимента в базу данных",
      typePage: "create",
    },
  },

  {
    path: "/experiment/display/:id",
    name: "experimentDisplay",
    component: () => import("../views/experiment/Display.vue"),
    meta: {
      layout: "Default",
      name: "Отображение эксперимента",
      typePage: "display",
    },
  },

  {
    path: "/experiment/:id",
    name: "experimentEdit",
    component: () => import("../views/experiment/Edit.vue"),
    meta: {
      layout: "Default",
      name: "Редактирование эксперимента",
      typePage: "edit",
    },
  },
];
