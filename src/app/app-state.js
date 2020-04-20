import Vue from 'vue'
import Vuex from 'vuex'

import { accidentDatabaseState } from './views/accident-database'
import { appGlobalState } from '@/app/global/state'
import { newsPageState } from './views/news-page'
import { riverDetailState } from './views/river-detail'
import { riverIndexState } from './views/river-index'
import { riverSearchState } from './views/river-search'
import { safetyPageState } from './views/safety-page'
import { userState } from './views/user'

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
    riverIndexState,
    riverSearchState,
    safetyPageState,
    userState
  }
})
