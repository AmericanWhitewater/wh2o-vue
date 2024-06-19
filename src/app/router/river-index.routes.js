import RiverIndex from '@/app/views/river-index/river-index.vue'

export default [
  {
    path: '/river-index',
    name: 'river-index',
    meta: {
      crumbLabel: 'River Index',
      transitionName: 'slide'
    },
    component: RiverIndex
  },
  {
    path: '/river-index/state/:state',
    name: 'rivers-by-state',
    meta: {
      crumbLabel: 'Rivers by State',
      transitionName: 'slide'
    },
    component: () => import('@/app/views/river-index/rivers-by-state.vue')
  }
]
