import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null,
    refId: null
  },
  mutations: {
    ...mutations,
    'SET_REF_ID' (state, payload) {
      state.refId = payload
    }
  },
  actions: {
    ...actions,
    setRefId (context, data) {
      context.commit('SET_REF_ID', data)
    }
  }
}
