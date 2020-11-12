import { reflectKeys } from '@/app/global/services'
import { fetchAlertsData, createAlert } from '@/app/views/river-detail/controllers'
import moment from 'moment'

const initialState = {
  data: null,
  error: null,
  loading: false
}

const namespacedPrefix = '[ALERTS]'

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

export const alertsActions = reflectKeys(
  ['FETCH_ALERTS_DATA', 'CREATE_ALERT'],
  namespacedPrefix
)

const actions = {
  async [alertsActions.FETCH_ALERTS_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchAlertsData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      const sortedPosts = result.data.posts.data.sort((a, b) =>
        moment(b.post_date, 'YYYY-MM-DD HH:mm:ss') - moment(a.post_date, 'YYYY-MM-DD HH:mm:ss')
      )
      context.commit(DATA_SUCCESS, sortedPosts)
    }

    return result
  },
  async [alertsActions.CREATE_ALERT] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await createAlert(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      // eslint-disable-next-line no-console
      console.log('result :', result)
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
