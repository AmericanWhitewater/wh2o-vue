import { AppPageNotFound } from "@/app/global/components";

import Home from "./home-page/home-page.vue";

const staticRoutes = [
  {
    path: "/",
    name: "home",
    meta: {
      crumbLabel: "Home"
    },
    component: Home
  },
  {
    path: "/safety",
    name: "safety",
    meta: {
      crumbLabel: "Safety"
    },
    component: () => import("./safety-page/safety-page.vue")
  },
  {
    path: "*",
    name: "page-not-found",
    component: AppPageNotFound
  }
];

export default staticRoutes;
