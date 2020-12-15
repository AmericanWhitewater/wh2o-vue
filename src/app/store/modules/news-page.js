import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import http from '@/app/http'

/**
 * this setup is for headless wordpress. 
 * 
 * remove if not needed.
 */

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null
  },
  mutations,
  actions: {
    ...actions,
    getNewsArticles: () => {
      return http.get('/v2/posts').then(res => res.data)
    },
    searchArticles: () => {
      return http.get('/v2/posts?content=').then(res => res.data)
    },
    getFeaturedMedia: () => {
      return http.get('/v2/media/').then(res => res.data)
    },
    getFrontPageNews: () => {
      return http.get('frontpage').then(res => res.data)
    }
  }
}
