import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import http from '@/app/http'

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
    getProperty: async (context) => {

      try {
        context.commit('DATA_REQUEST')
        const result = await http.get("/content/News/all/type/frontpagenews/subtype//page/0/.json").then(res => res.data.articles.CArticleGadgetJSON_view_list)

        context.commit('DATA_SUCCESS', result)

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }

    }
  }
}
