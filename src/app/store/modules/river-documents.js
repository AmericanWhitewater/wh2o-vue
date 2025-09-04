import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachDocuments } from "@/app/services"

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: [],
    refId: null
  },
  mutations,
  actions: {
    ...actions,
    async getProperty(context, wpID) {
      context.commit('DATA_REQUEST')

      try {
        const result = await getReachDocuments(wpID)

          context.commit('DATA_SUCCESS', result)

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }

    }
  }
}
