import { httpClient } from '@/app/global/services'

const fetchRapidsData = data => {
  return httpClient
    .post('graphql/', {
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
    .then(res => res.data.data.reach.pois)
}

const createRapid = data => {
  return httpClient.post('graphql/', {
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
        reach_id: data.reach_id,
        name: data.name,
        rloc: data.rloc,
        description: data.description,
        difficulty: data.difficulty,
        distance: data.distance,
        character: data.character || [],
        approximate: false // change this if approximate is added to form
      }
    }
  }).then(response => {
    return response.data
  })
}

const updateRapid = data => {
  return httpClient.post('graphql/', {
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
        character: data.character
      }
    }
  }).then(response => {
    return response.data
  })
}

const deleteRapid = id => {
  return httpClient.post('graphql/', {
    query: `
      mutation ($id:ID!) {
        poiDelete(id: $id) {
          id
        }
      }
    `,
    variables: {
      id: id
    }
  }).then(response => {
    return response.data
  })
}

export { fetchRapidsData, createRapid, updateRapid, deleteRapid }
