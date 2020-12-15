import http from '@/app/http'

export function userLogin (data) {
  return http.post('/oauth/token', data).then(response => {
    return response.data
  })
}
