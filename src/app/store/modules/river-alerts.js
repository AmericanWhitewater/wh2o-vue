import mutations from '@/app/store/mutations'
import actions from '@/app/store/actions'
import moment from 'moment'
import {getReachAlerts} from "@/app/services"

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null
  },
  mutations,
  actions: {
    ...actions,
    async getProperty(context, id) {
      context.commit('DATA_REQUEST')

      try {
        const result = await getReachAlerts(id)
        
        if (!result.errors) {
          const sortedPosts = result.data.posts.data.sort((a, b) =>
            moment(b.post_date, 'YYYY-MM-DD HH:mm:ss') - moment(a.post_date, 'YYYY-MM-DD HH:mm:ss')
          )
          context.commit('DATA_SUCCESS', sortedPosts)
        
        } else {
          context.commit('DATA_ERROR', 'error')
        }
        
      } catch (error) {
        // console.log('error :>> ', error);
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
