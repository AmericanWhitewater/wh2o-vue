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
  mutations,
  actions
}
