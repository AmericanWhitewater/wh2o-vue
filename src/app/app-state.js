import Vue from "vue";
import Vuex from "vuex";

import { riverDetailState } from "./river-detail";
import { newsPageState } from "./news-page";
import { userState } from "./user";
import { riverSearchState } from "./river-search";
import { accidentDatabaseState } from "./accident-database";
import { appGlobalState } from "@/app/global/state";
import { nwiMapState } from "./nwi-map";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    accidentDatabaseState,
    appGlobalState,
    newsPageState,
    nwiMapState,
    riverDetailState,
    riverSearchState,
    userState
  }
});
