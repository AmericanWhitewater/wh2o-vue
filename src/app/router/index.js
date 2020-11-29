import Vue from "vue";
import VueRouter from "vue-router";

import { appLocalStorage } from "@/app/global/services";
import {laravelDeploy} from "@/app/environment"
import staticRoutes from '@/app/views/static-routes/static-routes'

import accidentsRoutes from './accidents.routes'
import affiliatesRoutes from './affiliates.routes'
import articleRoutes from "./articles.routes"
import documentsRoutes from './documents.routes'
import gageDetailRoutes from './gage-detail.routes'
import gagesRoutes from './gages.routes'
import newsPageRoutes from "./news-page.routes"
import projectsRoutes from './projects.routes'
import reportDetailRoutes from "./report-detail.routes"
import riverDetailRoutes from "./river-detail.routes"
import riverIndexRoutes from "./river-index.routes"
import tripReportsRoutes from "./trip-reports.routes"
import userRoutes from "./user.routes"

Vue.use(VueRouter);

const routes = [
  ...accidentsRoutes,
  ...affiliatesRoutes,
  ...articleRoutes,
  ...documentsRoutes,
  ...gageDetailRoutes,
  ...gagesRoutes,
  ...newsPageRoutes,
  ...projectsRoutes,
  ...reportDetailRoutes,
  ...riverDetailRoutes,
  ...riverIndexRoutes,
  ...staticRoutes,
  ...tripReportsRoutes,
  ...userRoutes,
];

const router = new VueRouter({
  mode: laravelDeploy && "history",
  base: laravelDeploy && "content/River/view",
  routes,
  /**
   *
   * @param {object} to next route target
   * @param {object} from previous route
   * @param {object} savedPosition uses position provided by browser back/forward buttons.
   */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      /**
       * @description check to see if user is navigating to river-detail for first time.
       * if yes, then reset the scroll position to top of screen, if not, keep scroll position
       * where it is. better UX when switching between river-detail tabs.
       *
       */
      const riverDetailRouteNames = [
        "flow-tab",
        "main-tab",
        "map-tab",
        "gallery-tab",
        "accidents-tab",
        "credits-tab",
        "news-tab",
      ];
      if (
        riverDetailRouteNames.indexOf(to.name) !== -1 &&
        riverDetailRouteNames.indexOf(from.name) !== -1
      ) {
        return;
      }
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach((to, from, next) => {
  const token = appLocalStorage.getItem("wh2o-auth");
  if (to.path.includes("account") && !token) {
    next("/user/access/login");
  }
  next();
});

export default router;
