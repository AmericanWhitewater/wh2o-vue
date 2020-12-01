import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import { getReachEvents } from '@/app/services'

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
        
        const result = await getReachEvents(id)

        if (!result.errors) {
          context.commit('DATA_SUCCESS', result)
        }

      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  },
  getters: {
    releases: state => {
      if (state.data) {
        const results = state.data.filter(item => !!item.data && item.data.length && item.data[0]?.category === 20)

        if (results.length) { 
          return results[0].data[0].dates.sort((a, b) => b.event_date.localeCompare(a.event_date))
        }
        return []
        
      }

      return []
    }
  }
}
