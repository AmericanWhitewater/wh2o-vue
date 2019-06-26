import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const axios = require("axios");
export default new Vuex.Store({
  state: {
    selectedRiver: {},
    isLoading: true
  },
  mutations: {
    // SET_LOADING_STATUS(status){
    //   state.isLoading = !state.isLoading
    // },
    SET_SELECTED_RIVER(state, river) {
      state.selectedRiver = river;
    }
  },
  actions: {
    setRiver(context, id) {
      // context.commit('SET_LOADING_STATUS', 'loading');
      axios.get("//localhost:3000/river").then(response => {
        context.commit("SET_SELECTED_RIVER", response.data[id]);
      });
    }
  }
});
