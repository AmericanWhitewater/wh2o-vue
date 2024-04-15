import Vue from "vue";
import VueMeta from "vue-meta";
import CarbonComponents from "@carbon/vue";
import VueMatomo from 'vue-matomo';

import "./app/plugins";
import "./app/filters";
import "./registerServiceWorker";

import apolloProvider from "./app/plugins/apollo-client";

import App from './app/app.vue'
import router from './app/router'
import store from './app/store'
import {laravelDeploy} from './app/environment'

import VueApollo from "vue-apollo";

Vue.config.devtools = process.env.NODE_ENV === "development";
Vue.config.productionTip = false;

Vue.use(CarbonComponents);
Vue.use(VueMeta);
Vue.use(VueApollo);
Vue.use(VueMatomo, {
  host: 'https://americanwhitewater.matomo.cloud/',
  siteId: 1
});

let mountPoint;

/**
 * determines where to mount the vue app.
 *
 * If we're mounting inside the production laravel app
 * use the shadow DOM, if not, the normal #app
 *
 */
// we might mount as an SPA, or in the shadow DOM
let setShadowRoot = false;
if (laravelDeploy) {
  // this is kind of disgusting but there's a link to the Vue root in the nav of the Laravel app
  // we need to avoid that causing a reload of the Vue app and instead just have it trigger
  // navigation to the root of the Vue app
  const navLinks = document.querySelectorAll('[href="/content/River/view/?"]');
  if (navLinks && navLinks.length) {
    // should only be one
    const navLink = navLinks[0];
    navLink.addEventListener("click", () => {
      router.replace("/");
    });
    navLink.setAttribute("href", "#");
  }
  
  // we are in the shadow DOM.
  setShadowRoot = true;
  mountPoint = document
    .querySelector("#wh2o-vue-host")
    .shadowRoot.querySelector("#wh2o-vue");
} else {
  // mimicking the Laravel embedded mount as closely as possible
  const shadow =  document.querySelector('body').attachShadow({mode: 'open'});
  const vueHost = document.createElement('div');
  shadow.appendChild(vueHost);

  // we are in the shadow DOM.
  setShadowRoot = true;
  mountPoint = vueHost;
}

export const wh2o = new Vue({
  router,
  store,
  apolloProvider,
  shadowRoot: setShadowRoot ? mountPoint.parentNode : false,
  render: (h) => h(App),
}).$mount(mountPoint);
