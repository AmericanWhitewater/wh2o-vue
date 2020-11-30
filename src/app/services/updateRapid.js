import http from "@/app/http"

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