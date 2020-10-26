export default [{
  path: '/admin/dashboard/analytics',
  name: 'dashboard-analytics',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard/DashboardPage.vue')
}]