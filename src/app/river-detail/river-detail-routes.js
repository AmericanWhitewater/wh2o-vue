const riverDetailRoutes = [
  {
    path: "/river-detail/:id",
    component: () => import("./river-detail.vue"),
    children: [
      {
        path: "main",
        name: "main-tab",
        component: () => import("./main-tab/main-tab.vue")
      },
      {
        path: "flow",
        name: "flow-tab",
        component: () => import("./flow-tab/flow-tab.vue"),
        children: [
          {
            path: "gage-detail/:gageID",
            name: "gage-detail",
            props: { default: true, gageDetail: true },
            component: () => import("./flow-tab/components/gage-detail.vue")
          }
        ]
      },
      {
        path: "map",
        name: "map-tab",
        component: () => import("./map-tab/map-tab.vue")
      },
      {
        path: "gallery",
        name: "gallery-tab",
        component: () => import("./gallery-tab/gallery-tab.vue")
      },
      {
        path: "accidents",
        name: "accidents-tab",
        component: () => import("./accidents-tab/accidents-tab.vue")
      },
      {
        path: "credits",
        name: "credits-tab",
        component: () => import("./credits-tab/credits-tab.vue")
      },
      {
        path: "weather",
        name: "weather-tab",
        component: () => import("./weather-tab/weather-tab.vue")
      },
      {
        path: "news",
        name: "news-tab",
        component: () => import("./news-tab/news-tab.vue")
      }
    ]
  }
];

export default riverDetailRoutes;
