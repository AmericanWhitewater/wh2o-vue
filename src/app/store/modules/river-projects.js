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
      context.commit('DATA_REQUEST')
      try {
        const result = await httpClient
          .post('graphql/', {
            query: `
      {
        linker(source: RIVER, id: "${id}") {
          type
          data {
            __typename
            ... on Project {
              id
              name
              description
            }
          }
        }
      }
      `
          })
          .then(res => res.data)
        
      context.commit('DATA_SUCCESS', result)
        
      } catch (error) {
        // console.log('error :>> ', error);
      }

    }
  }
}
