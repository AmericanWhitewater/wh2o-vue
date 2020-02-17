import { httpClient } from '../../../../global/services'

import { apiConstants } from '../../config'

const fetchMapData = data => {
  const url = apiConstants.map.base + data

  return httpClient.get(url).then(res => res.data)
}

export { fetchMapData }
