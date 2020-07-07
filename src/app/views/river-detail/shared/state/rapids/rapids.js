import { reflectKeys } from '@/app/global/services'

import { fetchRapidsData, updateRapid, createRapid } from '../../services'

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[RAPIDS]'

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET', 'UPDATE_REQUEST', 'UPDATE_SUCCESS', 'CREATE_REQUEST', 'CREATE_SUCCESS'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS, UPDATE_REQUEST, UPDATE_SUCCESS, CREATE_REQUEST, CREATE_SUCCESS } = mutationTypes

/**
 *  mutations
 */
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

  [UPDATE_REQUEST] (state) {
  },

  [UPDATE_SUCCESS] (state, payload) {
    const updatedReach = payload.poiUpdate
    const existingRapid = state.data.find(r => r.id === updatedReach.id)
    Object.assign(existingRapid, { ...updatedReach })
  },

  [CREATE_REQUEST] (state) {
  },

  [CREATE_SUCCESS] (state, payload) {
    const newReach = payload.poiUpdate
    state.data.push(newReach)
    const rapids = state.data.sort((a, b) => a.distance - b.distance)
    Object.assign(state, {
      data: rapids
    })
  }
}

/** Actions types constants */
export const rapidsActions = reflectKeys(
  ['FETCH_RAPIDS_DATA', 'UPDATE_RAPID', 'CREATE_RAPID', 'INITIAL_STATE'],
  namespacedPrefix
)

const actions = {
  async [rapidsActions.FETCH_RAPIDS_DATA] (context, data) {
    context.commit(DATA_REQUEST)
    const result = await fetchRapidsData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (!result.errors) {
      const sortedPois = result.data.reach.pois.sort((a, b) => a.distance - b.distance)
      context.commit(DATA_SUCCESS, sortedPois)
    } else {
      context.commit(DATA_ERROR, 'error')
    }

    return result
  },

  async [rapidsActions.INITIAL_STATE] (context, data) {
    context.commit(DATA_RESET)
  },

  async [rapidsActions.UPDATE_RAPID] (context, data) {
    context.commit(UPDATE_REQUEST, data)

    const payload = {
      rloc: `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`,
      ...data
    }
    const result = await updateRapid(payload).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (!result.errors) {
      context.commit(UPDATE_SUCCESS, result.data)
    } else {
      context.commit(DATA_ERROR, 'error')
    }
  },

  async [rapidsActions.CREATE_RAPID] (context, data) {
    context.commit(CREATE_REQUEST, data)

    const payload = {
      rloc: `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`,
      ...data
    }

    const result = await createRapid(payload).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (!result.errors) {
      context.commit(CREATE_SUCCESS, result.data)
    } else {
      context.commit(DATA_ERROR, 'error')
    }
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
