import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import {getAffiliates} from "@/app/services"
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
        const result = await getAffiliates()
        
        if (result.data) {
          context.commit('DATA_SUCCESS', result.data.affiliates.data)
        } else {
          context.commit('DATA_ERROR', result.errors)
        }

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
