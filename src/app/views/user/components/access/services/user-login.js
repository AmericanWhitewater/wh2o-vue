import { laravelClient } from '@/app/http'

export function userLogin (data) {
  return laravelClient.post('/oauth/token', data).then(response => {
    return response.data
  })
}
