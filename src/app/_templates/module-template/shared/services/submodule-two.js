import { httpClient } from '@/app/global/services'

const fetchSubmoduleTwoData = data => {
  return httpClient.get('/graphql').then(res => res.data)
}

export { fetchSubmoduleTwoData }
