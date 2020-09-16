import { httpClient } from '@/app/global/services'

const fetchAccidentsData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        reach(id: ${data}) {
          accidents(first: 20, page: 1) {
            data {
              accident_date
              water_level
              status
              factors {
                factor
              }
              injuries {
                injury
              }
              id
            }
          }
        }
      }`
    })
    .then(res => res.data)
}

export { fetchAccidentsData }
