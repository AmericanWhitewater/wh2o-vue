import { reflectKeys } from '@/app/global/services'

const initialState = {
  loading: false,
  data: null,
  error: null,
  userLocation: null,
  mapStyle: 'topo',
  mapColorBy: 'difficulty',
  fullscreen: null,
  mapPosition: null,
  mouseoveredFeature: null
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
  MOUSEOVERED_FEATURE
} = mutationTypes

const mutations = {
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [DATA_SUCCESS] (state, payload) {
    state.loading = false
    state.data = payload.length > 0 ? payload : null
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
  ['FETCH_USER_LOCATION', 'LOAD_REACHES', 'SET_MAP_STYLE', 'SET_MAP_COLOR_BY', 'SET_MAP_POSITION', 'MOUSEOVER_FEATURE'],
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
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
