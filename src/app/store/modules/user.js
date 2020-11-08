import actions from '@/app/store/actions/actions'
import mutations from '@/app/store/mutations'

export default {
  namespaced: true,
  state: {
    error: false,
    loading: false,
    data: null
  },
  actions,
  mutations
}
