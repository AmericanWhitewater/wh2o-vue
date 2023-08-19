import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { laravelClient } from '@/app/http'

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
      return laravelClient.get('/v2/posts').then(res => res.data)
    },
    searchArticles: () => {
      return laravelClient.get('/v2/posts?content=').then(res => res.data)
    },
    getFeaturedMedia: () => {
      return laravelClient.get('/v2/media/').then(res => res.data)
    },
    getFrontPageNews: () => {
      return laravelClient.get('frontpage').then(res => res.data)
    }
  }
}
