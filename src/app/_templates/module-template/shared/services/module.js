import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchModuleData = data => {
  const url = `${apiConstants.moduleEndpoint}`
  return httpClient.get(url).then(res => res.data)
}

export { fetchModuleData }
