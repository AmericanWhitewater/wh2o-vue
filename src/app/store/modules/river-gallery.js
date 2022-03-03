import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachGallery } from '@/app/services'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null,
    pagination: null
  },
  mutations: {
    ...mutations,
    ['PAGINATION'](state, payload) {
      Object.assign(state, { loading: false, pagination: payload })
    },
  },
  actions: {
    ...actions,
    async getProperty(context, data) {
      context.commit('DATA_REQUEST')
      try {
        const result = await getReachGallery(data)
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result.data.posts.data)
          context.commit('PAGINATION', result.data.posts.paginatorInfo)
        } else {
          context.commit('DATA_ERROR', 'error')
        }
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
  },
  getters: {
    media: state => {
      if (state.data) {
        const images = state.data.flatMap((post) => {
          return post.photos.map((photo) => {
            return {
              ...photo,
              reach_id: post.reach_id,
              post_id: post.id,
              permissions: post.permissions,
              reading: post.reading,
              gauge: post.gauge,
              metric: post.metric,
              metric_id: post.metric_id,
              post_date: post.post_date,
              post_type: post.post_type
            }
          })
        })

        return images
      }

      return null
    }
  }
}
