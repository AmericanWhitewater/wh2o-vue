import Vue from "vue";
import Router from "vue-router";

import { riverDetailRoutes } from "./river-detail";
import { newsPageRoutes } from "./news-page";
import { nwiMapRoutes } from "./nwi-map";
import { usersRoutes } from "./users";
import { riverSearchRoutes } from "./river-search";

// import { AppPageNotFound } from "./global/components";

import Home from "./home-page/home-page.vue";

Vue.use(Router);

const appRoutes = [
  {
    path: "/",
    name: "Home",
    component: Home
  }
  // {
  //   path: "*",
  //   name: "page-not-found",
  //   component: AppPageNotFound
  // }
];

const routes = [
  ...riverDetailRoutes,
  ...nwiMapRoutes,
  ...newsPageRoutes,
  ...usersRoutes,
  ...riverSearchRoutes,
  ...appRoutes
];

export default new Router({
  mode: "history",
  routes
});
