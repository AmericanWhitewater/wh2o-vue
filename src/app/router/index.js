import Vue from "vue";
import VueRouter from "vue-router";

import { appLocalStorage } from "@/app/global/services";
import staticRoutes from '@/app/views/static-routes/static-routes'

import riverIndexRoutes from "./river-index.routes"
import riverDetailRoutes from "./river-detail.routes"
import userRoutes from "./user.routes"

Vue.use(VueRouter);

const routes = [
  ...riverDetailRoutes,
  ...riverIndexRoutes,
  ...staticRoutes,
  ...userRoutes,
];

const router = new VueRouter({
  mode: "history",
  base: "content/River/view",
  routes,
});

router.beforeEach((to, from, next) => {
  const token = appLocalStorage.getItem("wh2o-auth");
  if (to.path.includes("account") && !token) {
    window.location.href = "/login";
    return;
  }
  next();
});

export default router;
