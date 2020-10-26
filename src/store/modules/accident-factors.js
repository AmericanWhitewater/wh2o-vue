import actions from '../actions'
import mutations from '../mutations'

export default {
  namespaced: true,
  state: {
    data: null,
    loading: false,
    error: null
  },
  mutations,
  actions 
}