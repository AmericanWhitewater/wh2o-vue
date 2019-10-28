import Vue from "vue";
import CarbonComponents from "@carbon/vue";

import "./app/plugins";

import App from "./app/app.vue";

import "./app/assets/scss/app.scss";
import router from "./app/app-routes";
import store from "./app/app-state";

Vue.use(CarbonComponents);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
