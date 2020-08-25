import { httpClient } from '@/app/global/services'
const fetchStates = () => {
  return httpClient.post('/graphql', {
    query: `
            query {
                states (aw_only: true, fist: 50, page: 1) {
                    name
                    abbreviation
                    country
                }
            }
        `
  }).then(r => {
    return r.data
  })
}

export { fetchStates }
