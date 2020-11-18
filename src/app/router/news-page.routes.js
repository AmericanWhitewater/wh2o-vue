export default [
  {
    path: '/news',
    name: 'news',
    meta: {
      crumbLabel: 'News'
    },
    component: () => import('@/app/views/news-page/news-page.vue')
  },
  {
    path: '/article/:id',
    name: 'article-detail',
    meta: {
      crumbLabel: 'Article'
    },
    component: () => import('@/app/views/news-page/components/article-detail.vue')
  },
  {
    path: '/new-article',
    name: 'new-article',
    meta: {
      crumbLabel: 'New Article'
    },
    component: () => import('@/app/views/news-page/components/new-article.vue')
  }
]