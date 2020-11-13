import actions from '@/app/store/actions'
import mutations from '@/app/store/mutations'
import moment from 'moment'
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
        const result = await httpClient
          .post('/graphql', {
            query: `
      query {
        reach(id: ${id}) {
          accidents(first: 20, page: 1) {
            data {
              accident_date
              water_level
              status
              type
              factors {
                factor
              }
              injuries {
                injury
              }
              causes {
                cause
              }
              id
            }
          }
        }
      }`
          })
          .then(res => {
            const data = res.data.data.reach.accidents.data.map(a => {
              a.accident_date = moment(a.accident_date, 'YYYY-MM-DD HH:mm:ss')
              return a
            }).sort((a, b) => b.accident_date.unix() - a.accident_date.unix())
            return data
          })
        
      
        if (!result.errors) {
          context.commit('DATA_SUCCESS', result)
        }
        
      } catch (error) {
        console.log('error :>> ', error);
        context.commit('DATA_ERROR', error)
      }
    }
  }
}
