import http from "@/app/http"

export async function createRapid(data) {
  const payload = {
    ...data
  };

  if (data.geom.coordinates.length) {
    payload.rloc = `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`;
  }

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