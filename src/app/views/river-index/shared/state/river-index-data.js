import { reflectKeys } from '@/app/global/services'

// import { getUserLocation } from "../services";

const initialState = {
  loading: false,
  data: null,
  error: null,
  userLocation: null,
  mapStyle: 'topo',
  fullscreen: null,
  mapPosition: null,
  highlightedFeature: null
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
    'MAP_POSITION',
    'HIGHLIGHTED_FEATURE'
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
  MAP_POSITION,
  HIGHLIGHTED_FEATURE
} = mutationTypes

const mutations = {
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [DATA_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },

  [USER_LOCATION] (state, payload) {
    Object.assign(state, { loading: false, userLocation: payload })
  },

  [MAP_STYLE] (state, payload) {
    Object.assign(state, { loading: false, mapStyle: payload })
  },

  [MAP_POSITION] (state, payload) {
    Object.assign(state, { loading: false, mapPosition: payload })
  },

  [HIGHLIGHTED_FEATURE] (state, payload) {
    Object.assign(state, { loading: false, highlightedFeature: payload })
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
  ['FETCH_USER_LOCATION', 'LOAD_REACHES', 'SET_MAP_STYLE', 'SET_MAP_POSITION', 'HIGHLIGHT_FEATURE'],
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
  async [riverIndexActions.SET_MAP_POSITION] (context, data) {
    context.commit(MAP_POSITION, data)
  },
  async [riverIndexActions.HIGHLIGHT_FEATURE] (context, data) {
    context.commit(HIGHLIGHTED_FEATURE, data)
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
