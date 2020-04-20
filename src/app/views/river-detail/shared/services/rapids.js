import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

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
              poi_name
              subject
              description
              author
              caption
              photo_date
              image {
                uri {
                  thumb
                  medium
                  big
                }
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

const createRapid = data => {
  const url = `/rapid/${data.id}`
  return httpClient.post(url, data)
}

const updateRapid = data => {
  const url = `/rapid/${data.id}`
  return httpClient.patch(url, data)
}

const deleteRapid = data => {
  const url = `/rapid/${data.id}`
  return httpClient.delete(url, data)
}

export { fetchRapidsData, createRapid, updateRapid, deleteRapid }
