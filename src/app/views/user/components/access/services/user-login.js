import { httpClient } from '@/app/global/services'
export function userLogin (data) {
  return httpClient.post('/oauth/token', data).then(response => {
    return response.data
  })
}
