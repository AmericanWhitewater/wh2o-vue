import ModuleTemplate from "./module-template.vue";

const moduleRoutes = [
  {
    path: "/module",
    name: "module",
    component: ModuleTemplate,
    children: [
      {
        path: "submodule-one",
        name: "submodule-one",
        component: () => import("./submodule-one/submodule-one.vue")
      },
      {
        path: "submodule-two",
        name: "submodule-two",
        component: () => import("./submodule-two/submodule-two.vue")
      }
    ]
  }
];

export default moduleRoutes;
