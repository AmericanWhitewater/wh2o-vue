import http from "@/app/http"

export async function updateReach(data) {
  return http.post('graphql', {
    query: `
              mutation ($id:ID!, $reach: ReachInput!) {
                reachUpdate(id: $id, reach: $reach) {
                  river,
                  section,
                  altname,
                  class,
                  length,
                  avggradient,
                  maxgradient,
                  permiturl,
                  permitinfo,
                  status,
                  geom,
                  ploc,
                  tloc,
                  length,
                  description,
                  photo_id,
                  photo {
                    id
                    image {
                      uri {
                        medium
                        big
                      }
                    }
                  }

                }
              }
            `,
    variables: data
  }).then(res => res.data)
}
