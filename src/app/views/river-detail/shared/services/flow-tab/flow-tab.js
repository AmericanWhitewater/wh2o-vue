import { httpClient } from '@/app/global/services'
import { apiConstants } from '../../config'

const fetchGaugeReadings = data => {
  /**
   * @todo need gage id
   */

  // const url = '/api/gauge/36667/flows/2?from=1570336187&to=1570422587&resolution=1'
  // const url = `/api/gauge/${data.gauge_id}/flows/${data.metric_id}?from=${data.timeStart}&to=${data.timeEnd}&resolution=${data.resolution}`
  const url = `/api/gauge/36667/flows/${data.metric_id}?from=${data.timeStart}&to=${data.timeEnd}&resolution=${data.resolution}`

  return httpClient.get(url).then(res => res.data)
}

const fetchGaugeSourceInfo = id => {
  const url = apiConstants.gauge.base + id + apiConstants.gauge.source

  return httpClient.get(url).then(res => res.data)
}

const fetchGaugeMetrics = () => {
  const url = apiConstants.gauge.base + apiConstants.gauge.metrics

  return httpClient.get(url).then(res => res.data)
}

export { fetchGaugeReadings, fetchGaugeSourceInfo, fetchGaugeMetrics }
