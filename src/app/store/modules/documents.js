import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import {getDocuments} from "@/app/services"

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
    async getProperty(context) {
      try {
        context.commit('DATA_REQUEST')
        const result = await getDocuments()

        if (!result.errors) {
          context.commit('DATA_SUCCESS', result)
        } else {
          context.commit('DATA_ERROR', result.errors)
        }

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
