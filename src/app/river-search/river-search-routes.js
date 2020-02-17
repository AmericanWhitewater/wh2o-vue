const riverSearchRoutes = [
  {
    path: '/river-search',
    name: 'river-search',
    meta: {
      crumbLabel: 'Search'
    },
    component: () => import('./river-search.vue')
  }
]

export default riverSearchRoutes
