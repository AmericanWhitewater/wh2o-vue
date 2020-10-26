export default [{
  path: '/admin/reaches',
  redirect: '/admin/reaches-list'
}, {
  path: '/admin/reaches/list',
  name: 'reaches-list',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "reaches-list" */ '@/pages/reaches/ReachesPage.vue')
},
{
  path: '/admin/reach-detail/:id',
  name: 'reach-detail',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "reach-detail" */ '@/pages/reaches/reach-detail/ReachDetail.vue')
}
]
