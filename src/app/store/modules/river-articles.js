import mutations from '@/app/store/mutations'
import { getReachArticles, getWordpressMediaByID } from '@/app/services'

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
    async getProperty(context, wpID) {
      context.commit('DATA_REQUEST')

      try {
        const result = await getReachArticles(wpID)
        if (result.length > 0) {
          // sort by date
          result.sort((a, b) => new Date(b.date_gmt) - new Date(a.date_gmt));

          // iterate through to retrieve featured image URLs
          for (const article of result) {
            if (article.acf.featured_image) {
              const media = await getWordpressMediaByID(article.acf.featured_image);
              const featuredImageUrl = media?.media_details?.sizes?.thumbnail?.source_url;
              article.featured_image_url = featuredImageUrl;
            }
          }
        }
        context.commit('DATA_SUCCESS', result)

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }

    }
  }
}
