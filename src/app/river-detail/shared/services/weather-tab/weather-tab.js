import { httpClient } from '../../../../global/services'

import { apiConstants } from '../../config'

const fetchWeatherData = data => {
  const url = `${apiConstants.weather + data.lat},${data.lon}`
  return httpClient.get(url).then(res => res.data)
}

export { fetchWeatherData }
