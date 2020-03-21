import axios from 'axios'
// import { appSessionStorage } from '@/app/global/services'
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

/**
 * Auth interceptor
 * @description add authorization token here.
 * @param {object} config
 * @returns axios config
 */
const authInterceptor = config => {
  // const token = appSessionStorage.getItem('aw-auth')
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNGM5MGRkNmRmNGJjNWMzMjNiOWE3NDc3YTY2Mzg0YmY1NzZmNDE4MmFiMTJkYmZhM2MyN2MyYWE2NTliMWU5MDk0NjE3YzU0OWYyNDc2NGMiLCJpYXQiOjE1ODQ4MTA2ODAsIm5iZiI6MTU4NDgxMDY4MCwiZXhwIjoxNjE2MzQ2NjgwLCJzdWIiOiIiLCJzY29wZXMiOltdfQ.nkdUPzEbFEE92FcgF49iqcTD5l8nSVN8d5uV-Q3k0xuB609-4X8FssNlvJgJhmO1_9gjcN0VY0pGEGsCpWD7ycCqyQAq45QU22L1Z8cYoTIgUBOmLzoq6IuvGwfQjvepaWxaYjzkO-NIGabbAzIJtePCa0VZ8uhnDzuNd0u9gX-xague25qzhkvbJrJhe7hL0eLk8K0k8vQsHgCj22sKqqtrPEhHv3f3l05SLXYd3meiope2flV7NLBrv53uv86r8Uz1Gf8q8X5s-vOMQ-UDEZJdct6MKvjaTpeh7xbCkMHV9gwPbyqshofUEPGmY7cKeM1WuSD-nreroeHprepkk4yxIISQ55QhIi3ZMH11jELpuW90uGnSBdj3TECgdwIgOuG_wTrpUX9Q_VlOVEvolCfGaZWQcetsQ-JXa4Rv-i-VI9ixZuqDsxgXNlqwZeTozsC7KZXmi7ZFstGAwy4bCS7OfOwO6Prvpuzn00OMoguGVxZOFMgU0y0S78Sjjx1PGsk_VXgP-TUTAx8jKG74tXBEoXgdoy5BG5VTWWiJWjxu0SEhn49H0E6RLo0dE2Rz3eqnf9dQBOslwHmk5xbRiBf6uBibzBFcOH6BgtuIfZ4TkdRgws9ttraYAk7e8iItjGIFfCg3mgi8B5Dm_sQSFilTiK7PWCYgDKAgTxwJTRY'

  config.headers.Authorization = token
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
