import Vue from "vue";
import Router from "vue-router";

import { riverDetailRoutes } from "./views/river-detail";
import { newsPageRoutes } from "./views/news-page";
import { userRoutes } from "./views/user";
import { riverSearchRoutes } from "./views/river-search";
import { accidentDatabaseRoutes } from "./views/accident-database";
import { safetyPageRoutes } from "./views/safety-page";
import { riverIndexRoutes } from "./views/river-index";
import staticRoutes from "./views/static-routes/static-routes";

Vue.use(Router);

const routes = [
  ...riverDetailRoutes,
  ...newsPageRoutes,
  ...userRoutes,
  ...riverSearchRoutes,
  ...accidentDatabaseRoutes,
  ...safetyPageRoutes,
  ...staticRoutes,
  ...riverIndexRoutes
];

export default new Router({
  // mode: "history",
  routes
});
