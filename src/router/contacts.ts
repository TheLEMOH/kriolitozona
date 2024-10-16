export default [
  {
    path: "/contacts",
    name: "contacts",
    component: () => import("../views/contacts/Contacts.vue"),
    meta: {
      layout: "Default",
      name: "Contacts",
      typePage: "display",
    },
  },
];
