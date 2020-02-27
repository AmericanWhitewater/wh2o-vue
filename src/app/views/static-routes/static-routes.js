import { AppPageNotFound } from '@/app/global/components'

import Home from './home-page/home-page.vue'

const staticRoutes = [
  {
    path: '/',
    name: 'home',
    meta: {
      crumbLabel: 'Home'
    },
    component: Home
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
