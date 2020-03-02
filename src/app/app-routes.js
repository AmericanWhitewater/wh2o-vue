import Vue from 'vue'
import Router from 'vue-router'

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

Vue.use(Router)

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

const router = new Router({
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
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
