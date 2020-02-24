import Vue from 'vue'
import Router from 'vue-router'

import { riverDetailRoutes } from './views/river-detail'
import { newsPageRoutes } from './views/news-page'
import { userRoutes } from './views/user'
import { riverSearchRoutes } from './views/river-search'
import { accidentDatabaseRoutes } from './views/accident-database'
import { safetyPageRoutes } from './views/safety-page'
import { riverIndexRoutes } from './views/river-index'
import { moduleRoutes } from './_templates/module-template'
import staticRoutes from './views/static-routes/static-routes'

Vue.use(Router)

const routes = [
  ...riverDetailRoutes,
  ...newsPageRoutes,
  ...userRoutes,
  ...riverSearchRoutes,
  ...accidentDatabaseRoutes,
  ...safetyPageRoutes,
  ...staticRoutes,
  ...riverIndexRoutes,
  ...moduleRoutes
]
/**
 *
 * @param {string} toName accepts the to.name
 */
const checkRoute = (toName) => {
  switch (toName) {
    case 'credits-tab':
      return false

    case 'main-tab':
      return false

    case 'flow-tab':
      return false

    case 'weather-tab':
      return false

    case 'gallery-tab':
      return false

    case 'accidents-tab':
      return false

    default:
      return true
  }
}

export default new Router({
  routes,
  /**
   * resets the scroll position to the top of the screen when navigating to new route.
   * @todo add smooth-scroll to saved position.
   * @param {*} to next route
   * @param {*} from previous route
   * @param {*} savedPosition only available if this is a popstate navigation (triggered by the browser's back/forward buttons)
   * @reference https://router.vuejs.org/guide/advanced/scroll-behavior.html
   */
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (to.name && checkRoute(to.name)) { return { x: 0, y: 0 } }
    }
  }
})
