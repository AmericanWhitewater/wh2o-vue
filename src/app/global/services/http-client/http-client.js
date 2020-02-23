import axios from 'axios'

import { apiBaseUrl } from '../../../environment/environment'

const config = {
  baseURL: apiBaseUrl,
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    }
  }
}

const httpClient = axios.create(config)

httpClient.interceptors.response.use(
  response => response,
  error =>
    /** Do something with response error */
    Promise.reject(error)
)

export { httpClient }
