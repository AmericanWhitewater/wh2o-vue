import Vue from "vue";
import VueRouter from "vue-router";

import { appLocalStorage } from "@/app/global/services";
import {laravelDeploy} from "@/app/environment"
import staticRoutes from '@/app/views/static-routes/static-routes'

import gageDetailRoutes from './gage-detail.routes'
import projectsRoutes from './projects.routes'
import documentsRoutes from './documents.routes'
import accidentsRoutes from './accidents.routes'
import gagesRoutes from './gages.routes'
import affiliatesRoutes from './affiliates.routes'
import riverIndexRoutes from "./river-index.routes"
import riverDetailRoutes from "./river-detail.routes"
import newsPageRoutes from "./news-page.routes"
import userRoutes from "./user.routes"

Vue.use(VueRouter);

const routes = [
  ...gageDetailRoutes,
  ...affiliatesRoutes,
  ...projectsRoutes,
  ...gagesRoutes,
  ...documentsRoutes,
  ...accidentsRoutes,
  ...newsPageRoutes,
  ...riverDetailRoutes,
  ...riverIndexRoutes,
  ...staticRoutes,
  ...userRoutes,
];

const router = new VueRouter({
  mode: "history",
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
       * if yes, then reset the scroll position to top of screen, if not, 
       * default scroll position to top of main detail display (below map banner)
       *
       */
      if (to.fullPath.includes("river-detail") && to.params.id === from.params.id) {
        // if we are moving between gallery main view and gallery detail, retain existing zoom
        const galleryRoutes = ['gallery-tab', 'gallery-detail'];
        if (galleryRoutes.includes(to.name) && galleryRoutes.includes(from.name)) {
          return;
        }

        // as far as I can tell, normal scrollBehavior using a selector doesn't work because
        // our app is embedded inside a shadow DOM, so instead, we're hardcoding offsets to ensure
        // users end up at the top of each tab they navigate to
        let offset;
        if (to.name === "map-tab") {
          offset = 50;
        } else {
          offset = 450;
        }
        return { x: 0, y: offset, behavior: "smooth" };
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
