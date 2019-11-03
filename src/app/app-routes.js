import Vue from "vue";
import Router from "vue-router";

import { riverDetailRoutes } from "./river-detail";
import { newsPageRoutes } from "./news-page";
import { nwiMapRoutes } from "./nwi-map";
import { usersRoutes } from "./users";
import { riverSearchRoutes } from "./river-search";
import { accidentDatabaseRoutes} from "./accident-database"
import staticRoutes from "./static-routes/static-routes"

Vue.use(Router);

const routes = [
  ...riverDetailRoutes,
  ...nwiMapRoutes,
  ...newsPageRoutes,
  ...usersRoutes,
  ...riverSearchRoutes,
  ...accidentDatabaseRoutes,
  ...staticRoutes
];

export default new Router({
  // mode: "history",
  routes
});
