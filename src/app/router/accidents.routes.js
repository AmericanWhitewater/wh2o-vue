export default [
  {
    path: '/accident-database',
    name: 'AccidentDatabase',
    component: () => import('@/app/views/accident-database/accident-database.vue')
  },
  {
    path: '/accident-detail',
    name: 'AccidentDetail',
    component: () => import('@/app/views/accident-database/accident-detail.vue')
  },
]
