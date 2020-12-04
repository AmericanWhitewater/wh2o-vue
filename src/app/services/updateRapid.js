import http from "@/app/http"

export async function updateRapid(data) {
  let rloc;

  if (data.geom.coordinates.length) {
    rloc = `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`;
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
      id: data.id,
      poi: {
        name: data.name,
        rloc: rloc,
        description: data.description,
        difficulty: data.difficulty,
        distance: data.distance,
        character: data.character
      }
    }
  }).then(res => res.data)
}