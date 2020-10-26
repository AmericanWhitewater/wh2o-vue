import * as type from './mutationTypes'

export default {
  [type.DATA_SUCCESS](state, payload) {
    state.data = payload
  },
  [type.DATA_LOADING](state, payload) {
    state.loading = payload
  },
  [type.DATA_ERROR](state, payload) {
    state.error = payload
  },
  [type.SET_DATA](state, payload) {
    state.data = payload
  }
}