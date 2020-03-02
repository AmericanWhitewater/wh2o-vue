import { reflectKeys, appLocalStorage } from '@/app/global/services'

import { fetchBookmarksData } from '../../services'

const initialState = {
  loading: false,
  data: [],
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
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS } = mutationTypes

const mutations = {
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null })
  },

  [DATA_SUCCESS] (state, payload) {
    const data = state.data
    data.push(payload)
    state.data = data

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
  ['ADD_BOOKMARK', 'FETCH_BOOKMARKS_DATA'],
  namespacedPrefix
)

const actions = {
  [bookmarksActions.ADD_BOOKMARK] (context, data) {
    const bookmarkRivers = appLocalStorage.getItem('wh2o-bookmarked-rivers')

    if (!bookmarkRivers) {
      appLocalStorage.setItem('wh2o-bookmarked-rivers', [data])
    } else {
      const updatedBookmarks = merge_array(bookmarkRivers, [data])
      appLocalStorage.setItem('wh2o-bookmarked-rivers', updatedBookmarks)
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
  }
}

export default {
  mutations,
  actions,
  state: initialState
}
