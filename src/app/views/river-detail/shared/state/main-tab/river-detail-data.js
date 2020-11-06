/**
 *
 * @todo this submodule should only be used for core, above the fold
 * reach data. for example, river name, section. each component should
 * be responsible for getting it's own data
 *
 */

import { reflectKeys } from '@/app/global/services'

import { fetchRiverDetailData, updateRiverDetailGeom, updateReach } from '../../services'

import wkx from 'wkx'

const initialState = {
  loading: false,
  data: {},
  error: null,
  mode: null
}

const namespacedPrefix = '[RIVER_DETAIL]'

const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET', 'MODE_SET', 'GEOM_UPDATE_REQUEST', 'GEOM_UPDATE_SUCCESS', 'GEOM_UDPATE_ERROR'],
  namespacedPrefix
)

const {
  DATA_ERROR,
  DATA_REQUEST,
  DATA_RESET,
  DATA_SUCCESS,
  MODE_SET,
  GEOM_UPDATE_REQUEST,
  GEOM_UPDATE_SUCCESS,
  GEOM_UPDATE_ERROR
} = mutationTypes

export const mutations = {

  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [DATA_SUCCESS] (state, payload) {
    state.loading = false
    Object.assign(state.data, { ...payload })
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
  },

  [GEOM_UPDATE_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [GEOM_UPDATE_SUCCESS] (state, payload) {
    state.loading = false
    Object.assign(state.data, {
      ...payload
    })
  },

  [GEOM_UPDATE_ERROR] (state, payload) {
    Object.assign(state, {
      error: payload || true,
      loading: false
    })
  }
}

export const riverDetailActions = reflectKeys(
  ['FETCH_RIVER_DETAIL_DATA', 'UPDATE_RIVER_DETAIL_GEOM', 'UPDATE_REACH', 'SET_EDIT_MODE', 'INITIAL_STATE'],
  namespacedPrefix
)

const actions = {
  async [riverDetailActions.UPDATE_REACH] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await updateReach({
      id: context.state.data.id,
      ...data
    }).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result.data?.errors) {
      context.commit(DATA_ERROR, result.data.errors)
    } else {
      context.commit(DATA_SUCCESS, result.data.reachUpdate)
    }
  },

  async [riverDetailActions.FETCH_RIVER_DETAIL_DATA] (context, riverId) {
    context.commit(DATA_REQUEST)

    const result = await fetchRiverDetailData(riverId).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.data.reach)
    }

    return result
  },

  async [riverDetailActions.UPDATE_RIVER_DETAIL_GEOM] (context, geomData) {
    context.commit(GEOM_UPDATE_REQUEST)

    const payloadData = {
      geom: wkx.Geometry.parseGeoJSON(geomData.geom).toWkt(),
      ploc: `${geomData.ploc[0]} ${geomData.ploc[1]}`,
      tloc: `${geomData.tloc[0]} ${geomData.tloc[1]}`,
      length: geomData.length
    }
    const result = await updateRiverDetailGeom({
      id: context.state.data.id,
      ...payloadData
    }).catch(e => {
      context.commit(GEOM_UPDATE_ERROR, e)
    })

    if (result.data.errors) {
      context.commit(GEOM_UPDATE_ERROR, result.data.errors)
    } else {
      context.commit(GEOM_UPDATE_SUCCESS, result.data.reachUpdate)
    }
  },

  async [riverDetailActions.SET_EDIT_MODE] (context, data) {
    context.commit(MODE_SET, data)
  },
  async [riverDetailActions.INITIAL_STATE] (context, data) {
    context.commit(DATA_RESET)
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
