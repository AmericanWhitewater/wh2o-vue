import { reflectKeys } from "../../../global/services";

import { fetchRiverDetailData } from "../services";

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null,
  mode: null
};

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = "[RIVER_DETAIL]";

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  ["DATA_SUCCESS", "DATA_REQUEST", "DATA_ERROR", "DATA_RESET", "MODE_SET"],
  namespacedPrefix
);

const {
  DATA_ERROR,
  DATA_REQUEST,
  DATA_RESET,
  DATA_SUCCESS,
  MODE_SET
} = mutationTypes;

/**
 * RIVER_DETAIL data mutations
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
  },

  /** user data success */
  [MODE_SET](state, payload) {
    Object.assign(state, { mode: payload });
  }
};

/** Actions types constants */
export const actionsTypes = reflectKeys(
  ["FETCH_RIVER_DETAIL_DATA", "SET_EDIT_MODE"],
  namespacedPrefix
);

/**
 * RIVER_DETAIL data actions
 */
const actions = {
  /** fetch river detail data */
  async [actionsTypes.FETCH_RIVER_DETAIL_DATA](context, riverId) {
    context.commit(DATA_REQUEST);

    const result = await fetchRiverDetailData(riverId).catch(e => {
      context.commit(DATA_ERROR, e);
    });

    if (result) {
      context.commit(DATA_SUCCESS, result.data.reach);
    }

    return result;
  },
  /** set detail mode */
  async [actionsTypes.SET_EDIT_MODE](context, data) {
    // eventually edit mode will need validation.
    // "confirm discard unsaved changes"
    context.commit(MODE_SET, data);
  }
};

export default {
  mutations,
  actions,
  state: initialState
};
