/**
 *
 * @todo this submodule should only be used for core, above the fold
 * reach data. for example, river name, section. each component should
 * be responsible for getting it's own data
 *
 */

import { reflectKeys } from '@/app/global/services'

import { fetchRiverDetailData } from '../../services'

const initialState = {
  loading: false,
  data: null,
  error: null,
  mode: null
}

const namespacedPrefix = '[RIVER_DETAIL]'

const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET', 'MODE_SET'],
  namespacedPrefix
)

const {
  DATA_ERROR,
  DATA_REQUEST,
  DATA_RESET,
  DATA_SUCCESS,
  MODE_SET
} = mutationTypes

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

  [MODE_SET] (state, payload) {
    Object.assign(state, { mode: payload })
  }
}

export const actionsTypes = reflectKeys(
  ['FETCH_RIVER_DETAIL_DATA', 'SET_EDIT_MODE', 'INITIAL_STATE'],
  namespacedPrefix
)

const actions = {

  async [actionsTypes.FETCH_RIVER_DETAIL_DATA] (context, riverId) {
    context.commit(DATA_REQUEST)

    const result = await fetchRiverDetailData(riverId).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.data.reach)
    }

    return result
  },

  async [actionsTypes.SET_EDIT_MODE] (context, data) {
    context.commit(MODE_SET, data)
  },
  async [actionsTypes.INITIAL_STATE] (context, data) {
    context.commit(DATA_RESET)
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
