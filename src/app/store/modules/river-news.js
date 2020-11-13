import mutations from '@/app/store/mutations'
import { httpClient } from '@/app/global/services'
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
    async getProperty(context, data) {
      context.commit('DATA_REQUEST')

      try {
        const result = await httpClient
          .post('graphql', {
            query: `
              query {
                  getRiverArticles(id: ${data}) {
                      articles {
                      abstract
                      image {
                        uri {
                          thumb
                          medium
                          big
                        }
                      }
                      author
                      posted_date
                      title
                      contents
                      id
                      }
                  }
              }`
          })
          .then(res => res.data)

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
