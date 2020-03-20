import Vue from 'vue'
import VueRouter from 'vue-router'

import { appLocalStorage } from '@/app/global/services'

import staticRoutes from './views/static-routes/static-routes'
import { accidentDatabaseRoutes } from './views/accident-database'
import { communityRoutes } from './views/community'
import { newsPageRoutes } from './views/news-page'
import { riverDetailRoutes } from './views/river-detail'
import { riverIndexRoutes } from './views/river-index'
import { riverSearchRoutes } from './views/river-search'
import { safetyPageRoutes } from './views/safety-page'
import { userRoutes } from './views/user'

Vue.use(VueRouter)

const routes = [
  ...accidentDatabaseRoutes,
  ...communityRoutes,
  ...newsPageRoutes,
  ...riverDetailRoutes,
  ...riverIndexRoutes,
  ...riverSearchRoutes,
  ...safetyPageRoutes,
  ...staticRoutes,
  ...userRoutes
]

const router = new VueRouter({
  routes,
  /**
   *
   * @param {object} to next route target
   * @param {object} from previous route
   * @param {object} savedPosition uses position provided by browser back/forward buttons.
   */
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      /**
       * if on a river detail page, do not reset scroll position
       * too jarring
       */
      switch (to.name) {
        case 'flow-tab':
          return
        case 'main-tab':
          return
        case 'map-tab':
          return
        case 'gallery-tab':
          return
        case 'accidents-tab':
          return
        case 'credits-tab':
          return
        case 'weather-tab':
          return
        case 'news-tab':
          return
        default:
          return { x: 0, y: 0 }
      }
    }
  }
})

router.beforeEach((to, from, next) => {
  const loggedIn = appLocalStorage.getItem('wh2o-registered')
  if (to.path.includes('account') && !loggedIn) {
    next('/user/access/login')
  }
  next()
})

export default router
