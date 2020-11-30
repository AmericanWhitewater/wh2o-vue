import { getStateList, searchReachMap} from "@/app/services"
import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations/'
import * as type from '@/app/store/mutations/mutations-types'

const initialState = {
  loading: false,
  data: [],
  error: null,
  userLocation: null,
  mapStyle: 'topo',
  mapColorBy: 'difficulty',
  fullscreen: null,
  mapBounds: null,
  mouseoveredFeature: null,
  stateList: null,
  mapSearchTerm: null,
  mapSearchLoading: false,
  mapSearchResults: []
}

export default {
  namespaced: true,
  state: initialState,
  mutations: {
    ...mutations,
    [type.DATA_RESET](state) {
      Object.assign(state, initialState)
    },
    ['STATE_LIST'](state, payload) {
      state.loading = false
      state.stateList = payload
    },
    ['USER_LOCATION'](state, payload) {
      Object.assign(state, { loading: false, userLocation: payload })
    },
    ['MAP_STYLE'](state, payload) {
      Object.assign(state, { loading: false, mapStyle: payload })
    },
    ['MAP_COLOR_BY'](state, payload) {
      Object.assign(state, { loading: false, mapColorBy: payload })
    },
    ['MAP_BOUNDS'](state, payload) {
      Object.assign(state, { loading: false, mapBounds: payload })
    },
    ['MOUSEOVERED_FEATURE'](state, payload) {
      Object.assign(state, { loading: false, mouseoveredFeature: payload })
    },
    ['MAP_SEARCH_TERM'](state, payload) {
      Object.assign(state, { mapSearchTerm: payload })
    },
    ['MAP_SEARCH_LOADING'](state, payload) {
      Object.assign(state, { mapSearchLoading: payload })
    },
    ['MAP_SEARCH_SUCCESS'](state, payload) {
      Object.assign(state, { mapSearchResults: payload, mapSearchLoading: false })
    },
    ['MAP_SEARCH_ERROR'](state, payload) {
      Object.assign(state, {
        mapSearchLoading: false,
        mapSearchResults: [],
        error: payload || true
      })
    },
  },
  actions: {
    ...actions,
    fetchUserLocation(context, data) {
      context.commit('USER_LOCATION', data)
    },
    loadReaches(context, data) {
      context.commit('DATA_SUCCESS', data)
    },
    setMapStyle(context, data) {
      context.commit('MAP_STYLE', data)
    },
    setMapColorBy(context, data) {
      context.commit('MAP_COLOR_BY', data)
    },
    setMapBounds(context, data) {
      context.commit('MAP_BOUNDS', data)
    },
    mouseOverFeature(context, data) {
      context.commit('MOUSEOVERED_FEATURE', data)
    },
    async fetchStates(context) {
      context.commit(type.DATA_LOADING)

      const result = await getStateList()

      if (result) {
        context.commit('STATE_LIST', result.data.data.states.data
          .filter(x => x.gmi.match(/USA-.*/))
          .sort((a, b) => {
            if (a.shortkey.toUpperCase() > b.shortkey.toUpperCase()) { return 1 }
            if (a.shortkey.toUpperCase() < b.shortkey.toUpperCase()) { return -1 }
            return 0
          })
        )
      }
      return result
    },
    async fetchMapSearchData(context, data) {
      context.commit('MAP_SEARCH_TERM', data)

      let result
      // if there's no search term, just set results to empty array
      if (!data || data.length === 0) {
        result = []
      } else {
        context.commit('MAP_SEARCH_LOADING', true)

        result = await searchReachMap(data)

      }

      if (!result.errors) {
        if (result.data && result.data.reachmap) {
          context.commit('MAP_SEARCH_SUCCESS', result.data.reachmap.data)
        } else {
          context.commit('MAP_SEARCH_SUCCESS', [])
        }
      } else {
        context.commit('MAP_SEARCH_ERROR', 'error searching')
      }
    },
    async clearMapSearchQuery(context) {
      context.commit('MAP_SEARCH_TERM', null)
      context.commit('MAP_SEARCH_LOADING', false)
    }
  }
}