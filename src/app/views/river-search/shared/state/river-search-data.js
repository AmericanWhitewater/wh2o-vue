import { reflectKeys } from '@/app/global/services'

import { fetchRiverSearchData } from '../services'

const initialState = {
  loading: null,
  data: null,
  error: null,
  searchTerm: null
}

const namespacedPrefix = '[RIVER_SEARCH]'

const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET', 'SEARCH_TERM'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS, SEARCH_TERM } = mutationTypes

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
  },

  [SEARCH_TERM] (state, payload) {
    Object.assign(state, { searchTerm: payload })
  }
}

export const riverSearchActions = reflectKeys(
  ['FETCH_RIVER_SEARCH_DATA'],
  namespacedPrefix
)

const actions = {
  async [riverSearchActions.FETCH_RIVER_SEARCH_DATA] (context, data) {
    context.commit(DATA_REQUEST)
    context.commit(SEARCH_TERM, data.river)

    const result = await fetchRiverSearchData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.data)
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
