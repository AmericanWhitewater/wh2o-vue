import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { httpClient } from '@/app/global/services'

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
        const result = await httpClient.post('graphql', {
          query: `
              query  {
            me {
              uid
              uname
            }
          }`
        })
          .then(res => res.data)
        
      context.commit('DATA_SUCCESS', result)
        
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
