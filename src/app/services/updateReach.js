import http from "@/app/http"

export async function updateReach(data) {
  return http.post('graphql', {
    query: `
              mutation ($id:ID!, $reach: ReachInput!) {
                reachUpdate(id: $id, reach: $reach) {
                  river,
                  section,
                  class,
                  length,
                  avggradient,
                  maxgradient,
                  status
                }
              }
            `,
    variables: data
  }).then(res => res.data)
}