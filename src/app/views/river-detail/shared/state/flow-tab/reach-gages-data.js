import { reflectKeys } from '@/app/global/services'
import { fetchGages } from '../../services'

const initialState = {
  loading: false,
  data: null,
  error: null
}

const namespacedPrefix = '[REACH_GAGES]'

const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes

const mutations = {

  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null, data: null })
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

export const reachGagesActions = reflectKeys(
  ['FETCH_GAGES'],
  namespacedPrefix
)

const actions = {

  async [reachGagesActions.FETCH_GAGES] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchGages(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.data.getGaugeInformationForReachID.gauges)
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
