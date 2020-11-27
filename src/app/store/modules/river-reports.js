import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import {getReachReports} from "@/app/services"

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
        const result = await getReachReports(id)


        if (!result.errors) {
          context.commit('DATA_SUCCESS', result)
        } else {
          context.commit('DATA_ERROR', result.errors[0].message)
        }

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
