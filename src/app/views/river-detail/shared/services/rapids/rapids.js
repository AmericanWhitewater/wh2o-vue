import { httpClient } from '@/app/global/services'

import { apiConstants } from '../../config'

const fetchRapidsData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id: ${data}) {
          pois {
            approximate
            character
            description
            difficulty
            distance
            id
            name
            photo {
              image {
                uri {
                  big
                  medium
                }
              }
            }
          }
        }
      }
    `
    })
    .then(res => res.data)
}

export { fetchRapidsData }
