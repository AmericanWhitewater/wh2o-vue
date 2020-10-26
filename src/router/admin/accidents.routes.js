export default [{
  path: '/admin/accidents',
  redirect: 'accidents-list'
}, {
  path: '/admin/accidents/list',
  name: 'accidents-list',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "accidents-list" */ '@/pages/accidents/AccidentsPage.vue')
},
{
  path: '/admin/accident-detail/:id',
  name: 'accident-detail',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "accident-detail" */ '@/pages/accidents/accident-detail/AccidentDetail.vue')
}
]
