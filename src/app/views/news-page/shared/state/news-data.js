import { reflectKeys } from '@/app/global/services'

import { getNewsArticles } from '../services'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const namespacedPrefix = '[NEWS]'

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

export const newsActions = reflectKeys(
  ['GET_ARTICAL_DETAIL_DATA', 'GET_NEWS_ARTICLES'],
  namespacedPrefix
)

const actions = {

  async [newsActions.GET_NEWS_ARTICLES] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await getNewsArticles(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result)
    }
    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
