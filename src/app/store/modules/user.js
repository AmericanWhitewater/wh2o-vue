import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { laravelClient } from "@/app/http"
import { getUser } from "@/app/services"

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
    getProperty: async (context) => {
      try {
        context.commit('DATA_REQUEST')
        const result = await getUser()

        context.commit('DATA_SUCCESS', result)

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
    userForgot: async (data) => {

      return laravelClient.post('graphql', data).then(res => res.data)
    },
    userLogin: data => {
      

      return laravelClient.post('graphql', {
        query: `
        mutation {
            login(input: ${data}) {
              access_token
              expires_in
              refresh_token
              token_type
            }
          }`
      }).then(res => res.data)
    },
    userRegister: data => {

      return laravelClient.post('graphql', data).then(res => res.data)
    },
    logout: (context) => {
      context.commit('DATA_RESET');
    }
  }
}
