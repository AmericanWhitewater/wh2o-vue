export default [
  {
    path: '/legacy-viewer',
    name: 'LegacyViewer',
    meta: {
      transitionName: 'slide'
    },
    component: () => import('@/app/views/legacy-viewer/legacy-viewer.vue')
  }
]