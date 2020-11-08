import * as types from './mutations-types'

export default {

  [types.DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },
  [types.CREATE_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },
  [types.DELETE_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },
  [types.UPDATE_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [types.DATA_LOADING] (state, status) {
    Object.assign(state, { loading: status, error: null })
  },
  [types.UPDATE_LOADING] (state, status) {
    Object.assign(state, { loading: status, error: null })
  },
  [types.DELETE_LOADING] (state, status) {
    Object.assign(state, { loading: status, error: null })
  },
  [types.CREATE_LOADING] (state, status) {
    Object.assign(state, { loading: status, error: null })
  },

  [types.DATA_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },
  [types.UPDATE_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },
  [types.DELETE_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },
  [types.CREATE_SUCCESS] (state, payload) {
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
