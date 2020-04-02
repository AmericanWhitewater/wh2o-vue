import { reflectKeys, appLocalStorage } from '@/app/global/services'

import { fetchBookmarksData, fetchBookmarksGageData } from '../../services'

const initialState = {
  loading: false,
  data: [],
  gageData: [],
  error: null
}

const namespacedPrefix = '[BOOKMARKS]'

const merge_array = (array1, array2) => {
  var result_array = []
  var arr = array1.concat(array2)
  var len = arr.length
  var assoc = {}

  while (len--) {
    var item = arr[len]

    if (!assoc[item]) {
      result_array.unshift(item)
      assoc[item] = true
    }
  }

  return result_array
}

const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET', 'GAGE_SUCCESS'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS, GAGE_SUCCESS } = mutationTypes

const mutations = {
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [GAGE_SUCCESS] (state, payload) {
    state.gageData = merge_array(state.gageData, [payload])
    // Object.assign(state, { gageData: payload, error: null, loading: false })
    // state.gageData = payload
  },

  [DATA_SUCCESS] (state, payload) {
    /**
     * make a copy of state to work with
     */
    const data = state.data
    /**
     * check to see if river has been previously bookmarked,
     * if true, do not push
     * @todo this check should happen before making the API call
     */
    const savedBookmark = data.find(b => b.id === payload.id)

    if (!savedBookmark) {
      data.push(payload)
      state.data = data
    }

    Object.assign(state, { loading: false, error: null })
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

export const bookmarksActions = reflectKeys(
  ['ADD_BOOKMARK', 'FETCH_BOOKMARKS_DATA', 'REMOVE_BOOKMARK', 'FETCH_BOOKMARKS_GAGE_DATA'],
  namespacedPrefix
)

const actions = {
  [bookmarksActions.ADD_BOOKMARK] (context, data) {
    const bookmarkedRivers = appLocalStorage.getItem('wh2o-bookmarked-rivers')

    if (!bookmarkedRivers) {
      appLocalStorage.setItem('wh2o-bookmarked-rivers', [data])
    } else {
      const updatedBookmarks = merge_array(bookmarkedRivers, [data])
      appLocalStorage.setItem('wh2o-bookmarked-rivers', updatedBookmarks)
    }

    return appLocalStorage.getItem('wh2o-bookmarked-rivers')
  },
  [bookmarksActions.REMOVE_BOOKMARK] (context, data) {
    const bookmarkedRivers = appLocalStorage.getItem('wh2o-bookmarked-rivers')

    if (bookmarkedRivers) {
      const index = bookmarkedRivers.indexOf(data)
      bookmarkedRivers.splice(index, 1)
      appLocalStorage.setItem('wh2o-bookmarked-rivers', bookmarkedRivers)
    }

    return appLocalStorage.getItem('wh2o-bookmarked-rivers')
  },
  async [bookmarksActions.FETCH_BOOKMARKS_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchBookmarksData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.data.reach)
    }

    return result
  },
  async [bookmarksActions.FETCH_BOOKMARKS_GAGE_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchBookmarksGageData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(GAGE_SUCCESS, result.data.getGaugeInformationForReachID.gauges)
    }

    return result
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
