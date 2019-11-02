const usersRoutes = [
  {
    path: "/users",
    component: () => import("./app-users.vue"),
    children: [
      {
        path: "login",
        name: "login",
        meta: {
          crumbLabel: 'Login'
        },
        component: () => import("./components/users-login.vue")
      },
      {
        path: "register",
        name: "register",
        meta: {
          crumbLabel: 'Login'
        },
        component: () => import("./components/users-register.vue")
      }
    ]
  }
];

export default usersRoutes;
