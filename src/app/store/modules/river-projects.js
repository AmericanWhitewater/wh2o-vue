import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachProjects } from '@/app/services'

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
        const result = await getReachProjects(wpID)

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
