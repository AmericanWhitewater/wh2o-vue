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
        const result = await httpClient
          .post('graphql', {
            query: `
              query {
                  me {
                    uid
                    email
                    mobile_profile
                    gauge_notification {
                      gauge_id
                    }
                    permissions
                    image {
                      uri {
                        big
                        medium
                        thumb
                      }
                    }
                    uname
                  }
                }
              `,
          })
          .then((res) => res.data);

        context.commit('DATA_SUCCESS', result)

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    },
    userForgot: data => {

      return httpClient.post('graphql', data).then(res => res.data)
    },
    userLogin: data => {
      

      return httpClient.post('graphql', {
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

      return httpClient.post('graphql', data).then(res => res.data)
    },
    logout: (context) => {
      context.commit('DATA_RESET');
    }
  }
}
