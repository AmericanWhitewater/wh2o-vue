import { reflectKeys } from "../../../global/services";

import { fetchRiverDetailData } from "../services";

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null
};

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = "[NWI_MAP]";

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  ["DATA_SUCCESS", "DATA_REQUEST", "DATA_ERROR", "DATA_RESET"],
  namespacedPrefix
);

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes;

/**
 * NWI_MAP data mutations
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
export const actionsTypes = reflectKeys(["FETCH_USER_DATA"], namespacedPrefix);

/**
 * NWI_MAP data actions
 */
const actions = {
  /** fetch user data */
  async [actionsTypes.FETCH_USER_DATA](context, authCred) {
    context.commit(DATA_REQUEST);

    const result = await fetchRiverDetailData(authCred).catch(e => {
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
