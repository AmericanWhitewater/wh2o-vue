import { httpClient } from '../../../global/services'

import { apiConstants } from '../config'

const userRegister = data => {
  const url = `${apiConstants.register}URL`

  return httpClient.post(url, data).then(res => res.data)
}

export { userRegister }
