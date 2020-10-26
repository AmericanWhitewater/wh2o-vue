import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import { localStoreWorker } from '@/services'

import HomePage from '@/pages/home/HomePage.vue'
import authRoutes from './auth'
import adminRoutes from './admin'
import webRoutes from "./web"

Vue.use(Router)

export const routes = [{
  path: '/',
  component: HomePage
},
...authRoutes,
  ...adminRoutes,
  ...webRoutes,
{
  path: '/blank',
  name: 'blank',
  component: () => import(/* webpackChunkName: "blank" */ '@/pages/BlankPage.vue')
},
{
  path: '*',
  name: 'error',
  component: () => import(/* webpackChunkName: "error" */ '@/pages/error/NotFoundPage.vue'),
  meta: {
    layout: 'error'
  }
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

/**
 * Check User Auth Before Each
 */
router.beforeEach((to, from, next) => {

  const token = localStoreWorker.get('wh2o-admin-auth')

  if (token && !store.getters['User/isAuthenticated']) {

    const { uid } = JSON.parse(token)

    store.dispatch('User/getProperty', {
      url: `/user?uid=${uid}`
    })

    return next()
  }

  if (!token && !store.getters['User/isAuthenticated'] && !to.path.includes('auth')) {
    return next('/auth/signin')
  } else {
    return next()
  }
})

export default router
