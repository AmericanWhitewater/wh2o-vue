import Vue from "vue";
import Router from "vue-router";

import { riverDetailRoutes } from "./river-detail";
import { newsPageRoutes } from "./news-page";
import { nwiMapRoutes } from "./nwi-map";
import { userRoutes } from "./user";
import { riverSearchRoutes } from "./river-search";
import { accidentDatabaseRoutes } from "./accident-database";
import { safetyPageRoutes } from "./safety-page";
import staticRoutes from "./static-routes/static-routes";

Vue.use(Router);

const routes = [
  ...riverDetailRoutes,
  ...nwiMapRoutes,
  ...newsPageRoutes,
  ...userRoutes,
  ...riverSearchRoutes,
  ...accidentDatabaseRoutes,
  ...safetyPageRoutes,
  ...staticRoutes
];

export default new Router({
  // mode: "history",
  routes
});
