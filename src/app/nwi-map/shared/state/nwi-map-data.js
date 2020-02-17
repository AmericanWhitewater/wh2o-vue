import { reflectKeys } from '../../../global/services'

// import { getUserLocation } from "../services";

const initialState = {
  loading: false,
  data: null,
  userLocation: null,
  error: null
}

const namespacedPrefix = '[NWI_MAP]'

const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes

const mutations = {
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [DATA_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },

  [DATA_ERROR] (state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    })
  },

  [DATA_RESET] (state) {
    Object.assign(state, ...initialState)
  }
}

export const nwiActions = reflectKeys(
  ['FETCH_USER_LOCATION'],
  namespacedPrefix
)

const actions = {
  async [nwiActions.FETCH_USER_LOCATION] (context, data) {
    context.commit(DATA_SUCCESS, data)
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
