import { reflectKeys } from "../../../global/services";

import { getArticleDetail, getFrontPageArticles } from "../services";

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null
};

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = "[NEWS_PAGE]";

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

  /** reset user data */
  [DATA_RESET](state) {
    Object.assign(state, ...initialState);
  }
};

/** Actions types constants */
export const newsActions = reflectKeys(
  ["GET_ARTICAL_DETAIL_DATA", "GET_FRONT_PAGE_ARTICLES"],
  namespacedPrefix
);

/**
 * NEWS_PAGE data actions
 */
const actions = {
  async [newsActions.GET_ARTICAL_DETAIL_DATA](context, data) {
    context.commit(DATA_REQUEST);

    const result = await getArticleDetail(data).catch(e => {
      context.commit(DATA_ERROR, e);
    });

    if (result) {
      context.commit(DATA_SUCCESS, result);
    }

    return result;
  },

  async [newsActions.GET_FRONT_PAGE_ARTICLES](context, data) {
    context.commit(DATA_REQUEST);

    const result = await getFrontPageArticles(data).catch(e => {
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
