import { reflectKeys } from "../../../global/services";

import { getAccidentDatabase } from "../services";

const initialState = {
  loading: false,
  data: null,
  error: null
};

const namespacedPrefix = "[ACCIDENT_DB]";

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

export const accidentDatabaseActions = reflectKeys(
  ["GET_ACCIDENT_DATABASE_DATA"],
  namespacedPrefix
);

const actions = {
  async [accidentDatabaseActions.GET_ACCIDENT_DATABASE_DATA](context, data) {
    context.commit(DATA_REQUEST);

    const result = await getAccidentDatabase(data).catch(e => {
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
