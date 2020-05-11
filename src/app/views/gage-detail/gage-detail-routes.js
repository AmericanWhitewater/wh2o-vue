import GageDetail from './gage-detail.vue'

const gageDetailRoutes = [
  {
    path: '/gage-detail/:gageId',
    name: 'gage-detail',
    meta: {
      crumbLabel: 'Gage Detail'
    },
    component: GageDetail
  }
]

export default gageDetailRoutes
