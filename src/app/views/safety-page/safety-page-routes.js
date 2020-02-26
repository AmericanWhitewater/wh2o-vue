import SafetyPage from './safety-page.vue'

const safetyPageRoutes = [
  {
    path: '/safety',
    name: 'safety-page',
    meta: {
      crumbLabel: 'Safety'
    },
    component: SafetyPage
  },
  {
    path: '/safety-resources',
    name: 'safety-resources',
    meta: {
      crumbLabel: 'Safety Resources'
    },
    component: () => import('./components/safety-resources.vue')
  },
  {
    path: '/new-paddlers',
    name: 'new-paddlers',
    meta: {
      crumbLabel: 'New Paddlers'
    },
    component: () => import('./components/new-paddlers.vue')
  }
]

export default safetyPageRoutes
