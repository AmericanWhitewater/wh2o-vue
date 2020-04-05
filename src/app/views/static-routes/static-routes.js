import { AppPageNotFound } from '@/app/global/components'

import Home from './home-page/home-page.vue'

const staticRoutes = [
  {
    path: '/',
    redirect: '/river-index',
    name: 'home',
    meta: {
      crumbLabel: 'Home'
    },
    component: Home
  },
  {
    path: '/terms-of-service',
    name: 'terms-of-service',
    meta: {
      crumbLabel: 'Terms of Service'
    },
    component: () => import('./legal/terms-of-service')
  },
  {
    path: '*',
    name: 'page-not-found',
    meta: {
      crumbLabel: '404'
    },
    component: AppPageNotFound
  }
]

export default staticRoutes
