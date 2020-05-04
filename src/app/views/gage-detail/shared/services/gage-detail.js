import { httpClient } from '@/app/global/services'

const fetchGageDetailData = data => {
  return httpClient.post('/graphql', {
    query: `
    query {
      gauge(id: "${data}") {
          enabled
          huc
          updates {
            updated
            obs_reading
            metric_id
          }
          timezone
          state
          source
          name
          loc
      }
    }`
  }).then(res => res.data)
}

export { fetchGageDetailData }
