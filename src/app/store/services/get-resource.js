import { http } from '@/app/global/services'

export function getResource (data) {
  return http.get(data.url).then(res => res.data)
}
