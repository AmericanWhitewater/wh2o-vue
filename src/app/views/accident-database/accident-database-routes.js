const accidentDatabaseRoutes = [
  {
    path: '/accident-database',
    name: 'accident-database',
    meta: {
      crumbLabel: 'Accident Database'
    },
    component: () => import('./accident-database.vue'),
    children: [
      {
        path: 'accident-detail/:accidentId',
        name: 'accident-detail',
        meta: {
          crumbLabel: 'Accident ID'
        },
        component: () => import('./components/accident-detail.vue')
      },
      {
        path: 'new-report',
        name: 'new-report',
        meta: {
          crumbLabel: 'New Report'
        },
        component: () => import('./new-report/new-report.vue'),
        children: [
          {
            path: 'step-01',
            name: 'step-01',
            component: () => import('./new-report/components/new-report-step-01.vue')
          },
          {
            path: 'step-02',
            name: 'step-02',
            component: () => import('./new-report/components/new-report-step-02.vue')
          },
          {
            path: 'step-03',
            name: 'step-03',
            component: () => import('./new-report/components/new-report-step-03.vue')
          },
          {
            path: 'step-04',
            name: 'step-04',
            component: () => import('./new-report/components/new-report-step-04.vue')
          }
        ]
      }
    ]
  }
]

export default accidentDatabaseRoutes
