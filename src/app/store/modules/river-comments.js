import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import moment from "moment"

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
    async getProperty(context, data) {

      try {
        context.commit('DATA_REQUEST')
        const result = await httpClient
          .post(url, {
            query: `
        query Related{
            posts(reach_id: "${data}", post_types: COMMENT, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
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
          }

    `
          })
          .then(res => res.data)

        if (!result.errors) {
          const sortedComments = result.data.posts.data.sort((a, b) =>
            moment(b.post_date, 'YYYY-MM-DD HH:mm:ss') - moment(a.post_date, 'YYYY-MM-DD HH:mm:ss')
          )
          context.commit(DATA_SUCCESS, sortedComments)
        }


      } catch (error) {
        context.commit('DATA_ERROR', error)
      }

    }
  }
}
