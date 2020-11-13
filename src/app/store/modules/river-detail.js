import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { httpClient } from '@/app/global/services'

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
      try {
        context.commit('DATA_REQUEST')
        const result = await httpClient
          .post('graphql', {
            query: `
              {
                reach(id: ${id}) {
                  avggradient
                  id
                  class
                  description
                  edited
                  edited
                  length
                  maxgradient
                  plat
                  plon
                  geom
                  photo {
                    id
                    post {
                      user {
                        uname
                        uid
                      }
                    }
                    image {
                      uri {
                        medium
                        big
                      }
                    }
                  }
                  river
                  section
                }
              }
            
            `,
          })
          .then((res) => res.data);

        if (!result.errors) {
          context.commit('DATA_SUCCESS', result.data.reach)
        } else {
          context.commit('DATA_ERROR', 'error')
        }
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
