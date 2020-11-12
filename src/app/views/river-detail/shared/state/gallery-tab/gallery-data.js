import { reflectKeys } from '@/app/global/services'

import { fetchGalleryData } from '@/app/views/river-detail/controllers'

/** Initial state */
const initialState = {
  loading: false,
  data: null,
  error: null,
  pagination: null
}

/** Prefix for mutation types and actiontypes */
const namespacedPrefix = '[GALLERY]'

/**
 * Mutation types
 */
const mutationTypes = reflectKeys(
  ['DATA_SUCCESS', 'DATA_REQUEST', 'DATA_ERROR', 'DATA_RESET', 'PAGINATION'],
  namespacedPrefix
)

const { DATA_ERROR, DATA_REQUEST, DATA_RESET, DATA_SUCCESS, PAGINATION } = mutationTypes

/**
 * GAGE_READINGS data mutations
 */
const mutations = {
  /** user data request */
  [DATA_REQUEST] (state) {
    Object.assign(state, { loading: true, error: null, data: null })
  },

  /** user data success */
  [DATA_SUCCESS] (state, payload) {
    Object.assign(state, { loading: false, data: payload })
  },
  /** user data success */
  [PAGINATION] (state, payload) {
    Object.assign(state, { loading: false, pagination: payload })
  },

  /** user data error */
  [DATA_ERROR] (state, payload) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: payload || true
    })
  },

  /** reset user data */
  [DATA_RESET] (state) {
    Object.assign(state, {
      loading: false,
      data: null,
      error: null
    })
  }
}

/** Actions types constants */
export const galleryActions = reflectKeys(
  ['FETCH_GALLERY_DATA', 'RESET_GALLERY_DATA'],
  namespacedPrefix
)

/**
 * gallery data actions
 */
const actions = {
  /** fetch gallery data */
  async [galleryActions.FETCH_GALLERY_DATA] (context, data) {
    context.commit(DATA_REQUEST)

    const result = await fetchGalleryData(data).catch(e => {
      context.commit(DATA_ERROR, e)
    })

    if (result) {
      context.commit(DATA_SUCCESS, result.data.posts.data)
      context.commit(PAGINATION, result.data.posts.paginatorInfo)
    }

    return result
  },
  /** reset gallery data */
  async [galleryActions.RESET_GALLERY_DATA] (context) {
    context.commit(DATA_RESET)
  }
}

const getters = {
  media: state => {
    if (state.data) {
      const images = state.data.flatMap((post) => {
        return post.photos.map((photo) => {
          return {
            ...photo,
            reading: post.reading,
            gauge: post.gauge,
            metric: post.metric,
            post_date: post.post_date
          }
        })
      })

      return images
    }

    return null
  }
}

export default {
  mutations,
  actions,
  getters,
  state: initialState
}
