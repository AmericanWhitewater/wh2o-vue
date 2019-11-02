const newsPageRoutes = [
  {
    path: "/news",
    name: 'news',
    meta: {
      crumbLabel: 'News'
    },
    component: () => import("./news-page.vue")
  },
  {
    path: "/article/:id",
    name: "article-detail",
    meta: {
      crumbLabel: 'Article Name'
    },
    component: () => import("./components/article-detail.vue")
  }
];

export default newsPageRoutes;
