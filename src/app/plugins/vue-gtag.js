/**
 * @description google analytics
 * @link https://matteo-gabriele.gitbook.io/vue-gtag/
 * @link https://github.com/MatteoGabriele/vue-gtag
 */

import Vue from 'vue'
import VueGtag from 'vue-gtag'
import router from '@/app/router'

if (process.env.NODE_ENV !== 'development') {
  const trackingId = process.env.VUE_APP_GOOGLE_ID || null

  Vue.use(VueGtag, {
    config: { id: trackingId }
  }, router)
}
