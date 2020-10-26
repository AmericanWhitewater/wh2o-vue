export default [
  {
    path: '/river-index',
    component: () => import('@/pages/river-index/RiverIndexPage.vue')
  },
  {
    path: '/search',
    component: () => import('@/pages/SearchPage.vue')
  },
  {
    path: '/reach-detail/:id',
    component: () => import('@/pages/reaches/reach-detail/ReachDetail.vue')
  }
]