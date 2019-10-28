const usersRoutes = [
  {
    path: "/users",
    component: () => import("./app-users.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () => import("./components/users-login.vue")
      },
      {
        path: "register",
        name: "register",
        component: () => import("./components/users-register.vue")
      }
    ]
  }
];

export default usersRoutes;
