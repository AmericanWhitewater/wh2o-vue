const accidentDatabaseRoutes = [
  {
    path: '/accident-database',
    name: 'accident-database',
    meta: {
      crumbLabel: 'Accident Database'
    },
    component: () => import('./accident-database.vue')
  },
  {
    path: '/accident-database/:accidentId',
    name: 'accident-detail',
    meta: {
      crumbLabel: 'Accident ID'
    },
    component: () => import('./components/accident-detail.vue')
  }
]

export default accidentDatabaseRoutes
