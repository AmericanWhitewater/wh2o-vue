import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import {getGageMetrics} from "@/app/services"

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
      try {
        const result = await getGageMetrics(id)
        context.commit('DATA_SUCCESS', result)
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
