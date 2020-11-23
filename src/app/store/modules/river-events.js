import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachCredits } from '@/app/services'

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
    async getProperty(context, id) {
      try {
        context.commit('DATA_REQUEST')
        const result = await getReachCredits(id)
        
        
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result)
        }
        
      } catch (error) {
        context.commit('DATA_ERROR', error)
        // console.log('error :>> ', error);
      }
    }
  }
}
