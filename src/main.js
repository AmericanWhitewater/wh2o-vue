import './app/assets/scss/app.scss'
import './app/plugins'
import './registerServiceWorker'
import CarbonComponents from '@carbon/vue'
import { CarbonIconsVue } from '@carbon/icons-vue'
import Vue from 'vue'
import VueMeta from 'vue-meta'
import App from './app/app.vue'
import router from './app/app-routes'
import store from './app/app-state'

/**
 * @todo move all of this icon stuff to the plugins
 */
import UserAvatar16 from '@carbon/icons-vue/es/user--avatar/16.js'
import Filter16 from '@carbon/icons-vue/es/filter/16.js'
import FitToScreen16 from '@carbon/icons-vue/es/fit-to-screen/16.js'
import FitToScreen32 from '@carbon/icons-vue/es/fit-to-screen/32.js'

Vue.config.devtools = true
Vue.config.productionTip = false
Vue.use(CarbonComponents)
Vue.use(VueMeta)

Vue.use(CarbonIconsVue, {
  components: {
    UserAvatar16,
    Filter16,
    FitToScreen16,
    FitToScreen32
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
