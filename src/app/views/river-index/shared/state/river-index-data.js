import { reflectKeys } from '@/app/global/services'
import { fetchStates } from '../services/states'

const initialState = {
  loading: false,
  data: [],
  error: null,
  userLocation: null,
  mapStyle: 'topo',
  mapColorBy: 'difficulty',
  fullscreen: null,
  mapPosition: null,
  mouseoveredFeature: null,
  stateList: null
}

const namespacedPrefix = '[RIVER_INDEX]'

const mutationTypes = reflectKeys(
  [
    'DATA_SUCCESS',
    'DATA_REQUEST',
    'DATA_ERROR',
    'DATA_RESET',
    'USER_LOCATION',
    'MAP_STYLE',
    'MAP_COLOR_BY',
    'MAP_POSITION',
    'STATE_LIST',
    'MOUSEOVERED_FEATURE'
  ],
  namespacedPrefix
)

const {
  DATA_ERROR,
  DATA_REQUEST,
  DATA_RESET,
  DATA_SUCCESS,
  USER_LOCATION,
  MAP_STYLE,
  MAP_COLOR_BY,
  MAP_POSITION,
  STATE_LIST,
  MOUSEOVERED_FEATURE
} = mutationTypes

const mutations = {
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [DATA_SUCCESS] (state, payload) {
    state.loading = false
    state.data = payload
  },

  [STATE_LIST] (state, payload) {
    state.loading = false
    state.stateList = payload
  },

  [USER_LOCATION] (state, payload) {
    Object.assign(state, { loading: false, userLocation: payload })
  },

  [MAP_STYLE] (state, payload) {
    Object.assign(state, { loading: false, mapStyle: payload })
  },

  [MAP_COLOR_BY] (state, payload) {
    Object.assign(state, { loading: false, mapColorBy: payload })
  },

  [MAP_POSITION] (state, payload) {
    Object.assign(state, { loading: false, mapPosition: payload })
  },

  [MOUSEOVERED_FEATURE] (state, payload) {
    Object.assign(state, { loading: false, mouseoveredFeature: payload })
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

export const riverIndexActions = reflectKeys(
  ['FETCH_USER_LOCATION', 'LOAD_REACHES', 'SET_MAP_STYLE', 'SET_MAP_COLOR_BY', 'SET_MAP_POSITION', 'MOUSEOVER_FEATURE', 'FETCH_STATES'],
  namespacedPrefix
)

const actions = {
  async [riverIndexActions.FETCH_USER_LOCATION] (context, data) {
    context.commit(USER_LOCATION, data)
  },
  async [riverIndexActions.LOAD_REACHES] (context, data) {
    context.commit(DATA_SUCCESS, data)
  },
  async [riverIndexActions.SET_MAP_STYLE] (context, data) {
    context.commit(MAP_STYLE, data)
  },
  async [riverIndexActions.SET_MAP_COLOR_BY] (context, data) {
    context.commit(MAP_COLOR_BY, data)
  },
  async [riverIndexActions.SET_MAP_POSITION] (context, data) {
    context.commit(MAP_POSITION, data)
  },
  async [riverIndexActions.MOUSEOVER_FEATURE] (context, data) {
    context.commit(MOUSEOVERED_FEATURE, data)
  },
  async [riverIndexActions.FETCH_STATES] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchStates(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(STATE_LIST, result.data.states.data
        .filter(x => x.gmi.match(/USA-.*/))
        .sort((a, b) => {
          if (a.shortkey.toUpperCase() > b.shortkey.toUpperCase()) { return 1 }
          if (a.shortkey.toUpperCase() < b.shortkey.toUpperCase()) { return -1 }
          return 0
        })
      )
    }
    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
