export default [
  {
    path: '/articles',
    name: 'Articles',
    component: () => import("@/app/views/articles/articles.vue")
  },
  {
    path: '/article-detail/:id',
    name: 'ArticleDetail',
    component: () => import("@/app/views/articles/article-detail.vue")
  },
  {
    path: '/article-creator',
    name: 'ArticleCreator',
    component: () => import("@/app/views/articles/article-creator.vue")
  },
]