import { reflectKeys } from '@/app/global/services'
import { fetchCommentsData } from '@/app/views/river-detail/controllers'
import moment from 'moment'

const initialState = {
  data: null,
  error: null,
  loading: false
}

const namespacedPrefix = '[COMMENTS]'

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

export const commentsActions = reflectKeys(
  ['FETCH_COMMENTS_DATA'],
  namespacedPrefix
)

const actions = {
  async [commentsActions.FETCH_COMMENTS_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchCommentsData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      const sortedComments = result.data.posts.data.sort((a, b) =>
        moment(b.post_date, 'YYYY-MM-DD HH:mm:ss') - moment(a.post_date, 'YYYY-MM-DD HH:mm:ss')
      )
      context.commit(DATA_SUCCESS, sortedComments)
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
