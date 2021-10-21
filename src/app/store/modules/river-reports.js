import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachReports } from '@/app/services'

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
        const reports = await getReachReports(id)
        
        context.commit('DATA_SUCCESS', reports)
      } catch (error) {
        // console.log('error :>> ', error);
      }

    }
  }
}
