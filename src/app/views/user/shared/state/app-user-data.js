import { reflectKeys } from '@/app/global/services'

import { userRegister, userForgot } from '../services'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const namespacedPrefix = '[USER]'

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
    state.data = null
    state.error = null
    state.loading = null
  }
}

export const userActions = reflectKeys(
  ['USER_LOGIN', 'USER_REGISTER', 'USER_FORGOT', 'RESET_USER'],
  namespacedPrefix
)

const actions = {
  async [userActions.USER_LOGIN] (context, data) {
    context.commit(DATA_REQUEST)
    // temp. needs to follow defined pattern
    context.commit(DATA_SUCCESS, data)
    return data
  },
  async [userActions.USER_REGISTER] (context, data) {
    context.commit(DATA_REQUEST)
    const result = await userRegister(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })
    if (result) {
      context.commit(DATA_SUCCESS, result)
    }
    return result
  },
  async [userActions.USER_FORGOT] (context, data) {
    context.commit(DATA_REQUEST)
    const result = await userForgot(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })
    if (result) {
      context.commit(DATA_SUCCESS, result)
    }
    return result
  },
  async [userActions.RESET_USER] (context) {
    context.commit(DATA_RESET)
  }
}

const getters = {
  userIsAdmin: state => {
    if (state.data) {
      // return state.data.admin === 'admin'
      return true
    }
    return null
  }
}

export default {
  mutations,
  actions,
  getters,
  state: initialState
}
