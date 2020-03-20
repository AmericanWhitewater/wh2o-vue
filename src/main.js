import './app/assets/scss/app.scss'
import './app/plugins'
import './app/filters'
import './registerServiceWorker'
import CarbonComponents from '@carbon/vue'

import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './app/app.vue'
import router from './app/app-routes'
import store from './app/app-state'

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.use(CarbonComponents)
Vue.use(VueMeta)

export const wh2o = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
