import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchReachProjectsData = reachid => {
  return httpClient
    .post(`${apiConstants.graphql}`, {
      query: `
      {
        linker(source: RIVER, id: "${reachid}") {
          type
          data {
            __typename
            ... on Project {
              id
              name
              description
            }
          }
        }
      }
      `
    })
    .then(res => res.data)
}

export { fetchReachProjectsData }
