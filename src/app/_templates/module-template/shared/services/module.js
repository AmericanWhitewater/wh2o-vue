import { httpClient } from '@/app/global/services'

const fetchModuleData = data => {
  return httpClient.get('/graphql').then(res => res.data)
}

export { fetchModuleData }
