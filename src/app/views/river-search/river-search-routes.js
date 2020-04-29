const riverSearchRoutes = [
  {
    path: '/river-search',
    name: 'river-search',
    meta: {
      crumbLabel: 'Search',
      transitionName: 'slide'
    },
    component: () => import('./river-search.vue')
  }
]

export default riverSearchRoutes
