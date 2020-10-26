/**
 *
 * Instantiate and configure axios
 *
 * @note consider adding to prototype
 * Vue.prototype.$http = http
 *
 */
import qs from 'qs'
import axios from 'axios'
import { localStoreWorker } from './local-storage'
import { restApiBaseUrl } from '@/environment'

const config = {
  baseURL: restApiBaseUrl,
  // validateStatus: (status) => (status >= 200 && status < 300),
  paramsSerializer: (params) => qs.stringify(params, { indices: false })
}

const rest = axios.create(config)

/**
 * user auth interceptor
 */
const authInterceptor = (config) => {
  const userData = JSON.parse(localStoreWorker.get('wh2o-admin-auth'))

  if (userData && userData.token) {
    config.headers.Authorization = `Bearer ${userData.token}`
  }

  return config
}

rest.interceptors.request.use(authInterceptor)
rest.interceptors.response.use(
  (response) => response,
  (error) =>
    /** Do something with response error */
    Promise.reject(error)
)

export { rest }
