import mutations from '@/app/store/mutations'
import actions from '@/app/store/actions'
import moment from 'moment'
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
    async getProperty(context, reachId) {
      context.commit('DATA_REQUEST')

      try {
        const result = await httpClient
          .post('/graphql', {
            query: `
        query {
            posts(reach_id: "${reachId}", post_types: WARNING, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
              data {
                id
                title
                detail
                post_date
                revision
                post_type
                permissions {
                  domain
                  permission
                  result
                }
                user {
                  uname
                  uid
                  contact {
                    name
                  }
                  image {
                    uri {
                      thumb
                      medium
                      big
                    }
                  }
                }
              }
            }
          }`
          })
          .then(res => res.data)
        
        if (!result.errors) {
          const sortedPosts = result.data.posts.data.sort((a, b) =>
            moment(b.post_date, 'YYYY-MM-DD HH:mm:ss') - moment(a.post_date, 'YYYY-MM-DD HH:mm:ss')
          )
          context.commit('DATA_SUCCESS', sortedPosts)
        
        } else {
          context.commit('DATA_ERROR', 'error')
        }
        
      } catch (error) {
        console.log('error :>> ', error);
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
