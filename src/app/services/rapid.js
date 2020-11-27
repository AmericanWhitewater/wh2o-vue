import http from "@/app/http"

export async function getRapids(id) {
  return http
    .post('graphql', {
      query: `
                  query {
                    reach(id: ${id}) {
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

export async function createRapid(data) {
  const payload = {
    ...data,
    rloc: `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`,
  };

  return http.post('graphql', {
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
      id: payload.id,
      poi: {
        reach_id: payload.reach_id,
        name: payload.name,
        rloc: payload.rloc,
        description: payload.description,
        difficulty: payload.difficulty,
        distance: payload.distance,
        character: payload.character || [],
        approximate: false // change this if approximate is added to form
      }
    }
  }).then(res => res.data)
}

export async function deleteRapid(id) {
  return http.post('graphql', {
    query: `
            mutation ($id:ID!) {
              poiDelete(id: $id) {
                id
              }
            }
          `,
    variables: {
      id
    }
  }).then(res => res.data)
}

export async function updateRapid(data) {
  const point = `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`;

  const payload = {
    ...data,
    rloc: point,
  };

  return http.post('graphql', {
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
      id: payload.id,
      poi: {
        name: payload.name,
        rloc: payload.rloc,
        description: payload.description,
        difficulty: payload.difficulty,
        distance: payload.distance,
        character: payload.character
      }
    }
  }).then(res => res.data)
}