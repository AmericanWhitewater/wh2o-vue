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
    async getProperty(context, id) {
      try {
        context.commit('DATA_REQUEST')
        const result = await httpClient
          .post('/graphql', {
            query: `
              query {
                reach( id: ${id}) {
                    revisions(first:100,page:0){
                    data {
                        id
                        revision
                        sk {
                            uname
                            contact {
                                name  
                            }
                        }
                        revision_comment
                        edited
                        }
                    }
                }
            }`
          })
          .then(res => res.data)
        
        
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result)
        }
        
      } catch (error) {
        context.commit('DATA_ERROR', error)
        console.log('error :>> ', error);
      }
    }
  }
}
