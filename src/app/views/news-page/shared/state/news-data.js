import { reflectKeys } from '@/app/global/services'

import { getFrontPageArticles } from '../services'

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
  ['GET_ARTICAL_DETAIL_DATA', 'GET_FRONT_PAGE_ARTICLES'],
  namespacedPrefix
)

const actions = {

  async [newsActions.GET_FRONT_PAGE_ARTICLES] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await getFrontPageArticles(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.articles)
    }
    return result
  }
}

const getters = {
  featuredArticle: state => {
    if (state.data) {
      return state.data.CArticleGadgetJSON_view
    }
    return null
  },
  frontPageArticles: state => {
    if (state.data) {
      return state.data.CArticleGadgetJSON_view_list.slice(0, 4)
    }
    return null
  },
  newsArticles: state => {
    if (state.data) {
      return state.data.CArticleGadgetJSON_view_list
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
