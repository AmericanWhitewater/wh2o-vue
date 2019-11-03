import { reflectKeys } from "../services";

const initialState = {
  loading: false,
  error: null,
  editMode: null
};

const namespacedPrefix = "[APP_GLOBAL]";

const mutationTypes = reflectKeys(
  ["SUCCESS", "REQUEST", "ERROR", "RESET", "EDIT_MODE"],
  namespacedPrefix
);

const { ERROR, LOADING, EDIT_MODE, RESET } = mutationTypes;

const mutations = {

  [LOADING](state, payload) {
    Object.assign(state, { loading: payload});
  },

  [ERROR](state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    });
  },
  [EDIT_MODE](state, payload) {
    Object.assign(state, { editMode: payload });
  },

  [RESET](state) {
    Object.assign(state, ...initialState);
  }
};

export const globalAppActions = reflectKeys(
  ["TOGGLE_EDIT_MODE", "TOGGLE_LOADING"],
  namespacedPrefix
);

const actions = {
  async [globalAppActions.TOGGLE_EDIT_MODE](context, data) {
    context.commit(EDIT_MODE, data);
  },
  async [globalAppActions.TOGGLE_LOADING](context, data) {
    context.commit(LOADING, data);
  }
};

export default {
  mutations,
  actions,
  state: initialState
};
