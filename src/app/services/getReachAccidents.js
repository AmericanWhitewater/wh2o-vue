import { laravelClient } from "@/app/http"
import moment from 'moment'

export async function getReachAccidents(id) {

  return laravelClient.post('graphql', {
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
  }).then(res => {
    const data = res.data.data.reach.accidents.data.map(a => {
      a.accident_date = moment(a.accident_date, 'YYYY-MM-DD HH:mm:ss')
      return a
    }).sort((a, b) => b.accident_date.unix() - a.accident_date.unix())
    return data
  })
}