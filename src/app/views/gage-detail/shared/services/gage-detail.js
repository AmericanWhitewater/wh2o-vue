import { httpClient } from '@/app/global/services'

const fetchGageDetailData = data => {
  return httpClient.post('/graphql', {
    query: `
    query {
      gauge(id: "${data}") {
        enabled
        huc
        updates {
          write_sequence
          updated
          obs_time
          obs_ref
          obs_reading
          obs_id
          obs_data
          metric_id
          lobs_time
          lobs_reading
          lobs_id
          last_journal_date
          gd_ref
        }
        timezone
        state
        source_id
        source
        name
        loc
        id
      }
    }`
  }).then(res => res.data)
}

export { fetchGageDetailData }
