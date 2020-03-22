import { httpClient } from '@/app/global/services'

import { apiConstants } from '../../config'

const fetchAccidentsData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
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
      }
      
    
    `
    })
    .then(res => res.data)
}

export { fetchAccidentsData }
