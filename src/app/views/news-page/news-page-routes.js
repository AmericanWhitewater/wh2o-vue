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
    meta: {
      crumbLabel: 'Article'
    },
    component: () => import('./components/article-detail.vue')
  },
  {
    path: '/new-article',
    name: 'new-article',
    meta: {
      crumbLabel: 'New Article'
    },
    component: () => import('./components/new-article.vue')
  }
]

export default newsPageRoutes
