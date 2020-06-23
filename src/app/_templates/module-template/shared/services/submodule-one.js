import { httpClient } from '@/app/global/services'

const fetchSubmoduleOneData = data => {
  return httpClient.get('/graphql').then(res => res.data)
}

export { fetchSubmoduleOneData }
