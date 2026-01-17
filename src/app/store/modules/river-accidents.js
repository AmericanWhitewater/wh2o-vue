import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import {getReachAccidents} from "@/app/services"

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
    async getProperty(context, wpID) {
      context.commit('DATA_REQUEST')

      try {
        const result = await getReachAccidents(wpID)

        context.commit('DATA_SUCCESS', result)

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }

    }
  }
}
