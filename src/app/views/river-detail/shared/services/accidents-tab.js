import { httpClient } from '@/app/global/services'
import moment from 'moment'

const fetchAccidentsData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        reach(id: ${data}) {
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
      res.data.data.reach.accidents.data = res.data.data.reach.accidents.data.map(a => {
        a.accident_date = moment(a.accident_date, 'YYYY-MM-DD HH:mm:ss')
        return a
      }).sort((a, b) => b.accident_date.unix() - a.accident_date.unix())
      return res.data
    })
}

export { fetchAccidentsData }
