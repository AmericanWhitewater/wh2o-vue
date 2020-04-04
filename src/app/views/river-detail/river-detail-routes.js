const riverDetailRoutes = [
  {
    path: '/content/River/detail/id/:id',
    redirect: '/river-detail/:id/main',
    component: () => import('./river-detail.vue')
  },
  {
    path: '/river-detail/:id',
    name: 'river-detail',
    redirect: '/river-detail/:id/main',
    component: () => import('./river-detail.vue'),
    children: [
      {
        path: 'main',
        name: 'main-tab',
        meta: {
          crumbLabel: 'River Detail'
        },
        component: () => import('./main-tab/main-tab.vue')
      },
      {
        path: 'flow',
        name: 'flow-tab',
        meta: {
          crumbLabel: 'River Detail'
        },
        component: () => import('./flow-tab/flow-tab.vue'),
        children: [
          {
            path: 'gage-detail/:gageID',
            name: 'gage-detail',
            props: { default: true, gageDetail: true },
            component: () => import('./flow-tab/components/gage-detail.vue')
          }
        ]
      },
      {
        path: 'map',
        name: 'map-tab',
        meta: {
          crumbLabel: 'River Detail'
        },
        component: () => import('./map-tab/map-tab.vue')
      },
      {
        path: 'gallery',
        name: 'gallery-tab',
        meta: {
          crumbLabel: 'River Detail'
        },
        component: () => import('./gallery-tab/gallery-tab.vue')
      },
      {
        path: 'accidents',
        name: 'accidents-tab',
        meta: {
          crumbLabel: 'River Detail'
        },
        component: () => import('./accidents-tab/accidents-tab.vue')
      },
      {
        path: 'credits',
        name: 'credits-tab',
        meta: {
          crumbLabel: 'River Detail'
        },
        component: () => import('./credits-tab/credits-tab.vue')
      },
      {
        path: 'weather',
        name: 'weather-tab',
        meta: {
          crumbLabel: 'River Detail'
        },
        component: () => import('./weather-tab/weather-tab.vue')
      },
      {
        path: 'news',
        name: 'news-tab',
        meta: {
          crumbLabel: 'River Detail'
        },
        component: () => import('./news-tab/news-tab.vue')
      }
    ]
  }
]

export default riverDetailRoutes
