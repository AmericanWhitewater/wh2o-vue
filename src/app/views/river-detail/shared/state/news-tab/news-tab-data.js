import { reflectKeys } from '@/app/global/services'
import { fetchNewsTabData } from '../../services'
import moment from 'moment'

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
    Object.assign(state, initialState)
  }
}

export const newsTabActions = reflectKeys(['FETCH_NEWS_TAB_DATA'], namespacedPrefix)

const actions = {

  async [newsTabActions.FETCH_NEWS_TAB_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchNewsTabData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      if (result.errors) {
        context.commit(DATA_ERROR, result.errors[0].message)
      } else {
        const sortedArticles = result.data.getRiverArticles.articles.sort((a, b) =>
          moment(b.posted_date, 'YYYY-MM-DD HH:mm:ss') - moment(a.posted_date, 'YYYY-MM-DD HH:mm:ss')
        )
        context.commit(DATA_SUCCESS, sortedArticles)
      }
    }
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
