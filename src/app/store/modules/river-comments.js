import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import moment from "moment"
import { getReachComments } from '@/app/services'

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
        const result = await getReachComments(id)

        if (!result.errors) {
          const sortedComments = result.data.posts.data.sort((a, b) =>
            moment(b.post_date, 'YYYY-MM-DD HH:mm:ss') - moment(a.post_date, 'YYYY-MM-DD HH:mm:ss')
          )
          context.commit('DATA_SUCCESS', sortedComments)
        }


      } catch (error) {
        context.commit('DATA_ERROR', error)
      }

    }
  }
}
