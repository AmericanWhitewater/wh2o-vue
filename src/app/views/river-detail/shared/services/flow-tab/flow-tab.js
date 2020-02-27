import { httpClient } from '@/app/global/services'
import axios from 'axios'
import { apiConstants } from '../../config'

const fetchGaugeReadings = data => {
  const url = `https://americanwhitewater.org/api/gauge/${data.gauge_id}/flows/${data.metric_id}?from=${data.timeStart}&to=${data.timeEnd}&resolution=${data.resolution}`

  return axios.get(url).then(res => res.data)

  // return httpClient.get(url).then(res => res.data)
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
