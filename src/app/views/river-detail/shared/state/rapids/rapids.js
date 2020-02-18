import { reflectKeys } from "@/app/global/services";

import { fetchRapidsData } from "../../services";

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null
};

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = "[RAPIDS]";

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  ["DATA_SUCCESS", "DATA_REQUEST", "DATA_ERROR", "DATA_RESET"],
  namespacedPrefix
);

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes;

/**
 *  mutations
 */
const mutations = {
  [DATA_REQUEST](state) {
    Object.assign(state, { loading: true, error: null });
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
    Object.assign(state, ...initialState);
  }
};

/** Actions types constants */
export const rapidsActions = reflectKeys(
  ["FETCH_RAPIDS_DATA"],
  namespacedPrefix
);

/**
 * actions
 */
const actions = {
  async [rapidsActions.FETCH_RAPIDS_DATA](context, data) {
    context.commit(DATA_REQUEST);
    const result = await fetchRapidsData(data).catch(e => {
      context.commit(DATA_ERROR, e);
    });

    if (result) {
      context.commit(DATA_SUCCESS, result.data.reach.rapids);
    }

    return result;
  }
};

export default {
  mutations,
  actions,
  state: initialState
};
