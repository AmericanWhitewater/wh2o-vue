import Vue from 'vue'
import Vuex from 'vuex'

import { riverDetailState } from './views/river-detail'
import { safetyPageState } from './views/safety-page'
import { newsPageState } from './views/news-page'
import { userState } from './views/user'
import { riverSearchState } from './views/river-search'
import { riverIndexState } from './views/river-index'
import { accidentDatabaseState } from './views/accident-database'
import { appGlobalState } from '@/app/global/state'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    accidentDatabaseState,
    appGlobalState,
    newsPageState,
    riverDetailState,
    riverSearchState,
    userState,
    safetyPageState,
    riverIndexState
  }
})
