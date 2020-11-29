export default [
  {
    path: '/safety',
    name: 'SafetyPage',
    meta: {
      crumbLabel: 'Safety',
      transitionName: 'slide'
    },
    component: () => import('@/app/views/accident-database/safety-page.vue')
  },
  {
    path: '/accident-database',
    name: 'AccidentDatabase',
    meta: {
      crumbLabel: 'Accident Database',
      transitionName: 'slide'
    },
    component: () => import('@/app/views/accident-database/accident-database.vue')
  },
  {
    path: '/accident-detail',
    name: 'AccidentDetail',
    meta: {
      crumbLabel: 'Accident Detail',
      transitionName: 'slide'
    },
    component: () => import('@/app/views/accident-database/accident-detail.vue')
  },
]
