import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { httpClient } from '@/app/global/services'

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
      return httpClient.get('/v2/posts').then(res => res.data)
    },
    searchArticles: () => {
      return httpClient.get('/v2/posts?content=').then(res => res.data)
    },
    getFeaturedMedia: () => {
      return httpClient.get('/v2/media/').then(res => res.data)
    },
    getFrontPageNews: () => {
      return httpClient.get('frontpage').then(res => res.data)
    }
  }
}
