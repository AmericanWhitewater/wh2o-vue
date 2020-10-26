import {rest} from "@/services" 
import actions from '../actions'
import mutations from '../mutations'
import * as type from '../mutations/mutationTypes'

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
    async fetchStates(context, data) {
      context.commit(type.DATA_LOADING)

      // const result = await fetchStates(data).catch(e => {
      //   context.commit(DATA_ERROR, e)
      // })

      const result = await rest.post('/graphql', {
        query: `
            query {
                  states(first:100,aw_only:true){data{gmi,name,shortkey,type,aw_region,num_rivers,num_gauges}}
            }
        `
      },
        {
          baseUrl: 'https://beta.americanwhitewater.org/'
        })

      if (result) {
        context.commit('STATE_LIST', result.data.states.data
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
        // result = await fetchRiverSearchData(data).catch(e => {
        //   context.commit(DATA_ERROR, e)
        // })

        result = await rest.post('graphql/', {
          query: `
      {
        reachmap(first: 50, match: "${query}") {
          data {
            id
            river
            section
            altname
            class
            abstract
            geom
            states {
              shortkey
            }
            readingsummary {
              reading
              gauge_reading
              updated
              gauge_id
              metric {
                unit
              }
              gauge {
                id
                name
              }
            }
          }
        }
      }      
      `
        }).then(res => res.data)

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
    async clearMapSearchQuery(context, data) {
      context.commit(MAP_SEARCH_TERM, null)
      context.commit(MAP_SEARCH_LOADING, false)
    }
  }
}