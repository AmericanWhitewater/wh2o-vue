Vue.config.devtools = true;
Vue.config.productionTip = false;
Vue.use(CarbonComponents);
Vue.use(VueMeta);
import "./app/assets/scss/app.scss";
import "./app/plugins";
import "./registerServiceWorker";
import App from "./app/app.vue";
import CarbonComponents from "@carbon/vue";
import Vue from "vue";
import VueMeta from "vue-meta";
import router from "./app/app-routes";
import store from "./app/app-state";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
