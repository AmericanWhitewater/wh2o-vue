const newsPageRoutes = [
  {
    path: '/news',
    name: 'news',
    meta: {
      crumbLabel: 'News'
    },
    component: () => import('./news-page.vue')
  },
  {
    path: '/article/:id',
    name: 'article-detail',
    component: () => import('./components/article-detail.vue')
  },
  {
    path: '/new-article',
    name: 'new-article',
    component: () => import('./components/new-article.vue')
  }
]

export default newsPageRoutes
