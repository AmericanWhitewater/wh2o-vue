export default [
  {
    path: '/report-detail/:id',
    name: 'ReportDetail',
    component: () => import("@/app/views/report-detail/report-detail.vue")
  }
]