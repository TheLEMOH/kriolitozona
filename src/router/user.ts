export default [
  {
    path: "/user/create",
    name: "userCreate",
    component: () => import("../views/user/Create.vue"),
    meta: {
      layout: "Default",
      name: "Создание пользователя",
      typePage: "create",
    },
  },
  {
    path: "/user/:id",
    name: "userEdit",
    component: () => import("../views/user/Create.vue"),
    meta: {
      layout: "Default",
      name: "Редактирование пользователя",
      typePage: "edit",
    },
  },
  {
    path: "/user/all",
    name: "userAll",
    component: () => import("../views/user/Table.vue"),
    meta: {
      layout: "Default",
      name: "Все пользователи",
      typePage: "display",
    },
  },
];
