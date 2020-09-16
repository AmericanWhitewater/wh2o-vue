import Vue from 'vue'
import Vuex from 'vuex'

import { appGlobalState } from '@/app/global/state'
import { gageDetailState } from './views/gage-detail'
import { newsPageState } from './views/news-page'
import { riverDetailState } from './views/river-detail'
import { riverIndexState } from './views/river-index'
import { userState } from './views/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    appGlobalState,
    gageDetailState,
    newsPageState,
    riverDetailState,
    riverIndexState,
    userState
  }
})
