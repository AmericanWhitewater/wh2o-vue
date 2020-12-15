import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getGage } from '@/app/services'

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
    async getProperty(context, reachId) {
      try {
        const result = await getGage(reachId)

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
