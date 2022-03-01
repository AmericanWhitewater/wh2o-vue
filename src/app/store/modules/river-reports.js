import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachReports, deletePost } from '@/app/services'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    pagination: null,
    refId: null
  },
  mutations: {
    ...mutations,
    ['PAGINATION'](state, payload) {
      Object.assign(state, { pagination: payload })
    },
  },
  actions: {
    ...actions,
    async getProperty(context, payload={}) {
      context.commit('DATA_REQUEST')

      try {
        // if payload paging info is passed, we're explicitly requesting a new page
        // if not, we're just calling for a refresh of what's already displaying, if anything
        // if pagination info hasn't been filled in yet, then this is the first request for reports
        const result = await getReachReports(payload.id, {
          perPage: payload.perPage || context.state.pagination?.perPage || 10,
          page: payload.page || context.state.pagination?.currentPage || 1
        })
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result.data.posts.data)
          context.commit('PAGINATION', result.data.posts.paginatorInfo)
        } else {
          context.commit('DATA_ERROR', 'error')
        }
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
