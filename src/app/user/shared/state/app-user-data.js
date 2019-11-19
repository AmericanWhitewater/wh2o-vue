import { reflectKeys } from "../../../global/services";

// import { userLogin, userRegister, userForgot } from "../services";

const initialState = {
  loading: false,
  data: null,
  error: null
};

const namespacedPrefix = "[USER]";

const mutationTypes = reflectKeys(
  ["DATA_SUCCESS", "DATA_REQUEST", "DATA_ERROR", "DATA_RESET"],
  namespacedPrefix
);

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes;

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

export const userActions = reflectKeys(["FETCH_DATA"], namespacedPrefix);

const actions = {
  /** fetch article detail data */
  // async [actionsTypes.FETCH_DATA](context, articleId, authCred) {
  //   context.commit(DATA_REQUEST);
  //   const result = await fetchUsersData(articleId, authCred).catch(e => {
  //     context.commit(DATA_ERROR, e);
  //   });
  //   if (result) {
  //     context.commit(DATA_SUCCESS, result);
  //   }
  //   return result;
  // }
};

export default {
  mutations,
  actions,
  state: initialState
};
