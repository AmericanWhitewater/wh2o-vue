import Vue from 'vue'
import Router from 'vue-router'

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

export default new Router({
  routes
})
