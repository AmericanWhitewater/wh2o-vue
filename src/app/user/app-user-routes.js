const userRoutes = [
  {
    path: "/user",
    component: () => import("./app-user.vue"),
    children: [
      {
        path: "login",
        name: "login",
        meta: {
          crumbLabel: "Login"
        },
        component: () => import("./components/user-login.vue")
      },
      {
        path: "register",
        name: "register",
        meta: {
          crumbLabel: "Login"
        },
        component: () => import("./components/user-register.vue")
      }
    ]
  }
];

export default userRoutes;
