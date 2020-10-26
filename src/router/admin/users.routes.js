export default [{
  path: '/admin/users',
  redirect: '/admin/users-list'
}, {
  path: '/admin/users/list',
  name: 'users-list',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "users-list" */ '@/pages/users/UsersPage.vue')
}, {
  path: '/admin/users/edit',
  name: 'users-edit',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "users-edit" */ '@/pages/users/EditUserPage.vue')
}]
