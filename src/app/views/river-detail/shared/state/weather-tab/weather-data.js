import { reflectKeys } from "@/app/global/services";

import { fetchWeatherData } from "../../services";

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null
};

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = "[WEATHER]";

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  ["DATA_SUCCESS", "DATA_REQUEST", "DATA_ERROR", "DATA_RESET"],
  namespacedPrefix
);

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes;

/**
 * mutations
 */
const mutations = {
  [DATA_REQUEST](state) {
    Object.assign(state, { loading: true, error: null, data: null });
  },

  [DATA_SUCCESS](state, payload) {
    Object.assign(state, { loading: false, data: payload });
  },

  [DATA_ERROR](state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    });
  },

  [DATA_RESET](state) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: null
    });
  }
};

/** Actions types constants */
export const weatherActions = reflectKeys(
  ["FETCH_WEATHER_DATA", "RESET_WEATHER_DATA"],
  namespacedPrefix
);

/**
 * actions
 */
const actions = {
  /** fetch weather data */
  async [weatherActions.FETCH_WEATHER_DATA](context, data) {
    context.commit(DATA_REQUEST);

    const result = await fetchWeatherData(data).catch(e => {
      context.commit(DATA_ERROR, e);
    });

    if (result) {
      context.commit(DATA_SUCCESS, result);
    }

    return result;
  },
  /** reset weather data */
  async [weatherActions.RESET_WEATHER_DATA](context) {
    context.commit(DATA_RESET);
  }
};

export default {
  mutations,
  actions,
  state: initialState
};
