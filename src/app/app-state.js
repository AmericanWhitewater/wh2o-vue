import Vue from "vue";
import Vuex from "vuex";

import { riverDetailState } from "./river-detail";
import { newsPageState } from "./news-page";
import { usersState } from "./users";
import { riverSearchState } from "./river-search";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    riverDetailState,
    newsPageState,
    usersState,
    riverSearchState
  }
});
