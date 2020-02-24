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

export default new Router({
  routes
})
