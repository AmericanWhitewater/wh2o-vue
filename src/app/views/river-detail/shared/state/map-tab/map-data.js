import { reflectKeys } from '@/app/global/services'

import { fetchAccessData } from '@/app/views/river-detail/controllers'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const namespacedPrefix = '[MAP]'

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

export const mapActions = reflectKeys(['FETCH_ACCESS_DATA'], namespacedPrefix)

const actions = {

  async [mapActions.FETCH_ACCESS_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchAccessData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      if (result.errors) {
        context.commit(DATA_ERROR, result.errors[0].message)
      } else {
        context.commit(DATA_SUCCESS, result.data.reach)
      }
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
