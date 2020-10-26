export default [{
  path: '/admin/articles',
  redirect: '/admin/articles-list'
}, {
  path: '/admin/articles/list',
  name: 'articles-list',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "users-list" */ '@/pages/articles/ArticlesPage.vue')
},
{
  path: '/admin/articles/create',
  name: 'articles-create',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "articles-create" */ '@/pages/articles/CreateArticlePage.vue')
},
{
  path: '/admin/articles/edit/:id',
  name: 'articles-edit',
  meta: {
    layout: 'admin'
  },
  component: () => import(/* webpackChunkName: "articles-edit" */ '@/pages/articles/ArticleDetail.vue')
}
]
