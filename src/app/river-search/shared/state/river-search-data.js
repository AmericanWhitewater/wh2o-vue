import { reflectKeys } from "../../../global/services";

import { fetchRiverSearchData } from "../services";

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null
};

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = "[RIVER_SEARCH]";

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  ["DATA_SUCCESS", "DATA_REQUEST", "DATA_ERROR", "DATA_RESET"],
  namespacedPrefix
);

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes;

/**
 * NEWS_PAGE data mutations
 */
const mutations = {
  /** user data request */
  [DATA_REQUEST](state) {
    Object.assign(state, { loading: true, error: null });
  },

  /** user data success */
  [DATA_SUCCESS](state, payload) {
    Object.assign(state, { loading: false, data: payload });
  },

  /** user data error */
  [DATA_ERROR](state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    });
  },

  /** reset search data */
  [DATA_RESET](state) {
    Object.assign(state, ...initialState);
  }
};

/** Actions types constants */
// NOTE: be sure to rename this const as you add more submodules to app state
export const riverSearchActions = reflectKeys(
  ["FETCH_RIVER_SEARCH_DATA"],
  namespacedPrefix
);

/**
 *  data actions
 */
const actions = {
  /** fetch article detail data */
  async [riverSearchActions.FETCH_RIVER_SEARCH_DATA](context, data) {
    context.commit(DATA_REQUEST);

    const result = await fetchRiverSearchData(data).catch(e => {
      context.commit(DATA_ERROR, e);
    });

    if (result) {
      context.commit(DATA_SUCCESS, result);
    }

    return result;
  }
};

export default {
  mutations,
  actions,
  state: initialState
};
