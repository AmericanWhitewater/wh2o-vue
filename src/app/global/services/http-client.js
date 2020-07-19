import axios from 'axios'
import { appLocalStorage } from '@/app/global/services'
import { apiBaseUrl } from '@/app/environment'

const config = {
  baseURL: apiBaseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
  }
}

const httpClient = axios.create(config)

/**
 * Auth interceptor
 * @description add authorization token here.
 * @param {object} config
 * @returns axios config
 */
const authInterceptor = config => {
  const token = appLocalStorage.getItem('wh2o-auth')

  config.headers.Authorization = `Bearer ${token}`

  return config
}

httpClient.interceptors.request.use(authInterceptor)
httpClient.interceptors.response.use(
  response => response,
  error =>
    /** Do something with response error */
    Promise.reject(error)
)

export { httpClient }
