import { httpClient } from '@/app/global/services'

const fetchAccidentsData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        reach(id: ${data}) {
          accidents(first: 20, page: 1) {
            data {
              accidentdate
              waterlevel
              status
              factors {
                factor
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
