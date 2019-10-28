import { reflectKeys } from "../../../../global/services";

import { fetchGaugeSourceInfo } from "../../services";

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null
};

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = "[GAGE_SOURCE]";

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  ["DATA_SUCCESS", "DATA_REQUEST", "DATA_ERROR", "DATA_RESET"],
  namespacedPrefix
);

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes;

/**
 * GAGE_SOURCE data mutations
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

  /** reset user data */
  [DATA_RESET](state) {
    Object.assign(state, ...initialState);
  }
};

/** Actions types constants */
export const sourceActions = reflectKeys(
  ["FETCH_GAGE_SOURCE_INFO"],
  namespacedPrefix
);

/**
 * GAGE data actions
 */
const actions = {
  /** fetch gage source info */
  async [sourceActions.FETCH_GAGE_SOURCE_INFO](context, gageId, authCred) {
    context.commit(DATA_REQUEST);

    const result = await fetchGaugeSourceInfo(gageId, authCred).catch(e => {
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
