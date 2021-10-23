import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachReports, deletePost } from '@/app/services'

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
        context.commit('DATA_ERROR', error)
      }
    },
    async deleteProperty(context, id) {
      context.commit('DELETE_REQUEST')
      try {
        await deletePost(id)
        const newReports = context.state.data.filter((r) => r.id !== id)
        context.commit('DELETE_SUCCESS', newReports)
      } catch(error) {
        context.commit('DATA_ERROR', error)
      }
    }
  },
  getters: {
    getReportById: state => id => {
      return state.data.find(report => report.id === id)
    }
  }
}
