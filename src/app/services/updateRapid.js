import { laravelClient } from "@/app/http"

export async function updateRapid(data) {
  let rloc;

  if (data.geom && data.geom.coordinates.length) {
    rloc = `${data.geom.coordinates[0]} ${data.geom.coordinates[1]}`;
  }

  return laravelClient.post('graphql', {
    query: `
              mutation ($id:ID!, $poi: POIInput!) {
                poiUpdate(id: $id, poi: $poi) {
                  id,
                  name,
                  rloc,
                  description,
                  difficulty,
                  distance,
                  character,
                  photo_id,
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
            `,
    variables: {
      id: data.id,
      poi: {
        name: data.name,
        rloc: rloc,
        description: data.description,
        difficulty: data.difficulty,
        distance: data.distance,
        character: data.character,
        photo_id: data.photo_id
      }
    }
  }).then(res => res.data)
}