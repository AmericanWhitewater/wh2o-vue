import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
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
    async getProperty(context, id) {
      try {
        context.commit('DATA_REQUEST')
        const result = await httpClient
          .post('/graphql', {
            query: `{
        getGaugeInformationForReachID(id: ${id}) {
          gauges {
              # rc
              # epoch
              gauge_reading
              gauge_metric
              gauge_comment
              range_comment
              class
              excluded
              rmin
              rmax
              gauge {
                  name
                  id
              }
              updated
              last_gauge_reading
              last_gauge_updated
              gauge_perfect
              adjusted_reach_class
            }
          }
        }`
          })
          .then(res => res.data)
        
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result.data.getGaugeInformationForReachID.gauges)
        } else {
          context.commit('DATA_ERROR', result)
        }
        
        
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
