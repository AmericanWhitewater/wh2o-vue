import { reflectKeys } from '@/app/global/services'

import { fetchUserData } from '../services'

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
    Object.assign(state, initialState)
  }
}

export const userActions = reflectKeys(
  ['FETCH_USER_DATA', 'LOGOUT'],
  namespacedPrefix
)

const actions = {
  async [userActions.FETCH_USER_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchUserData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.data.me)
    }

    return result
  },
  async [userActions.LOGOUT] (context, data) {
    context.commit(DATA_RESET)
  }
}

const getters = {
  userIsAdmin: state => {
    if (state.data) {
      /**
       * @todo
       */
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
  state: Object.assign({}, initialState)
}
