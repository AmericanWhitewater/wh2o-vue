import accidentsRoutes from './accidents.routes'
import articlesRoutes from './articles.routes'
import dashboardRoutes from './dashboard.routes'
import reachesRoutes from './reaches.routes'
import usersRoutes from './users.routes'

export default [
  ...accidentsRoutes,
  ...articlesRoutes,
  ...dashboardRoutes,
  ...reachesRoutes,
  ...usersRoutes
]