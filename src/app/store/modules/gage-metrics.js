import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import {httpClient} from "@/app/global/services"

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
        const result = await httpClient
          .post('/graphql', {
            query: `
                {
                  getGaugeInformationForReachID(id: ${data}) {
                      metrics {
                        name
                        unit
                        format
                        id
                        shortkey
                      }
                    }
                  }
              
              `
          })
          .then(res => res.data.data.getGaugeInformationForReachID.metrics)
        context.commit('DATA_SUCCESS', result)
      } catch (error) {
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
