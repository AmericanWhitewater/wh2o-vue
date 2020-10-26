/**
 * This file is kind of a misnomer.
 * Another instance of Axios configured for the 
 * GraphQL API.
 * 
 */

import axios from 'axios'
import { appLocalStorage } from '@/app/global/services'
import { graphqlApiBaseUrl } from '@/environment'

const config = {
  baseURL: graphqlApiBaseUrl,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store, no-cache, must-revalidate, post-check=0, pre-check=0'
  }
}

const graphql = axios.create(config)

/**
 * Auth interceptor
 * @description add authorization token here.
 * @param {object} config
 * @returns axios config
 */
const authInterceptor = config => {
  const token = appLocalStorage.getItem('wh2o-auth')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
}

graphql.interceptors.request.use(authInterceptor)
graphql.interceptors.response.use(
  response => response,
  error =>
    /** Do something with response error */
    Promise.reject(error)
)

export { graphql }
