import mutations from '@/app/store/mutations'
import { getReachNews } from '@/app/services'
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
        const result = await getReachNews(id)

        if (!result.errors) {
          const sortedArticles = result.data.getRiverArticles.articles.sort((a, b) =>
            moment(b.posted_date, 'YYYY-MM-DD HH:mm:ss') - moment(a.posted_date, 'YYYY-MM-DD HH:mm:ss')
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
