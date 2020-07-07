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
            rloc
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
  return httpClient.post(apiConstants.graphql, {
    query: `
      mutation ($id:ID!, $poi: POIInput!) {
        poiUpdate(id: $id, poi: $poi) {
          id,
          name,
          rloc,
          description,
          difficulty,
          distance,
          character
        }
      }
    `,
    variables: {
      id: data.id,
      poi: {
        name: data.name,
        rloc: data.rloc,
        description: data.description,
        difficulty: data.difficulty,
        distance: data.distance,
        character: []
      }
    }
  }).then(response => {
    return response.data
  })
}

const deleteRapid = data => {
  const url = `/rapid/${data.id}`
  return httpClient.delete(url, data)
}

export { fetchRapidsData, createRapid, updateRapid, deleteRapid }
