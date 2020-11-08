import * as types from './mutations-types'

export default {

  [types.DATA_LOADING] (state, status) {
    Object.assign(state, { loading: status, error: null })
  },

  [types.DATA_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },

  [types.DATA_ERROR] (state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    })
  },

  [types.DATA_RESET] (state) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: false
    })
  }
}
