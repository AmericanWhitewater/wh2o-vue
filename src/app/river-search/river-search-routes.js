const riverSearchRoutes = [
  {
    path: "/river-search",
    name: "river-search",
    meta: {
      crumbLabel: 'River Search'
    },
    component: () => import("./river-search.vue")
  }
];

export default riverSearchRoutes;
