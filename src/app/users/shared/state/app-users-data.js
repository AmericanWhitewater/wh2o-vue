import { reflectKeys } from "../../../global/services";

import { fetchUsersData } from "../services";

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null
};

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = "[USERS]";

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  [
    "USERS_DATA_SUCCESS",
    "USERS_DATA_REQUEST",
    "USERS_DATA_ERROR",
    "USERS_DATA_RESET"
  ],
  namespacedPrefix
);

const {
  USERS_DATA_ERROR,
  USERS_DATA_REQUEST,
  USERS_DATA_RESET,
  USERS_DATA_SUCCESS
} = mutationTypes;

/**
 * USERS data mutations
 */
const mutations = {
  /** user data request */
  [USERS_DATA_REQUEST](state) {
    Object.assign(state, { loading: true, error: null });
  },

  /** user data success */
  [USERS_DATA_SUCCESS](state, payload) {
    Object.assign(state, { loading: false, data: payload });
  },

  /** user data error */
  [USERS_DATA_ERROR](state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    });
  },

  /** reset user data */
  [USERS_DATA_RESET](state) {
    Object.assign(state, ...initialState);
  }
};

/** Actions types constants */
export const actionsTypes = reflectKeys(["FETCH_USERS_DATA"], namespacedPrefix);

/**
 * USERS data actions
 */
const actions = {
  /** fetch article detail data */
  async [actionsTypes.FETCH_USERS_DATA](context, articleId, authCred) {
    context.commit(USERS_DATA_REQUEST);

    const result = await fetchUsersData(articleId, authCred).catch(e => {
      context.commit(USERS_DATA_ERROR, e);
    });

    if (result) {
      context.commit(USERS_DATA_SUCCESS, result);
    }

    return result;
  }
};

export default {
  mutations,
  actions,
  state: initialState
};
