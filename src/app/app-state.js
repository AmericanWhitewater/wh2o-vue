import Vue from "vue";
import Vuex from "vuex";

import { riverDetailState } from "./river-detail";
import { newsPageState } from "./news-page";
import { usersState } from "./users";
import { riverSearchState } from "./river-search";
import { accidentDatabaseState } from "./accident-database"
import { appGlobalState} from "@/app/global/state"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    appGlobalState,
    riverDetailState,
    newsPageState,
    usersState,
    riverSearchState,
    accidentDatabaseState
  }
});
