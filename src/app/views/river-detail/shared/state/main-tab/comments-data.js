import { reflectKeys } from '@/app/global/services'
import { fetchCommentsData } from '../../services'

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
      context.commit(DATA_SUCCESS, result.data.reach.posts.data)
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
