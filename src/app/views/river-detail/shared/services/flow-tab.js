import { httpClient } from '@/app/global/services'
import { apiConstants } from '../config'
import axios from 'axios'
import { baseUrl } from '@/app/environment'

const fetchGaugeReadings = data => {
  /**
   * @todo remove proxy and setup local gage server
   * @todo format url to load from .env value
   * @temp get flow data from prod
   *
   */
  const url = `${baseUrl}api/gauge/${data.gauge_id}/flows/${data.metric_id}?from=${data.timeStart}&to=${data.timeEnd}&resolution=${data.resolution}`
  /**
   * @temp ideally keep axios in httpClient wrapper
   */
  return axios.get(url).then(res => res.data)
}

const fetchGaugeSourceInfo = id => {
  const url = apiConstants.gauge.base + id + apiConstants.gauge.source

  return httpClient.get(url).then(res => res.data)
}

const fetchGages = data => {
  return httpClient
    .post('/graphql', {
      query: `{
        getGaugeInformationForReachID(id: ${data}) {
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
}
const fetchGaugeMetrics = data => {
  return httpClient
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
    .then(res => res.data)
}

export { fetchGaugeReadings, fetchGaugeSourceInfo, fetchGaugeMetrics, fetchGages }
