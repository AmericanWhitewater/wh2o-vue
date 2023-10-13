import mutations from '@/app/store/mutations'
import { getReachArticles } from '@/app/services'
import moment from 'moment'

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
    async getProperty(context, id) {
      context.commit('DATA_REQUEST')

      try {
        const result = await getReachArticles(id)

        if (!result.errors) {
          const sortedArticles = result.sort((a, b) =>
            moment(b.date, 'YYYY-MM-DDTHH:mm:ss') - moment(a.date, 'YYYY-MM-DDTHH:mm:ss')
          )
          context.commit('DATA_SUCCESS', sortedArticles)
        } else {
          context.commit('DATA_ERROR', result.errors[0].message)
        }

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }

    }
  }
}
