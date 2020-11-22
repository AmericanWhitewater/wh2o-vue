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
                  maxgradient
                }
              }
            `,
    variables: {
      id: data.id,
      reach: {
        river: data.river,
        section: data.section,
        class: data.class,
        length: data.length,
        avggradient: data.avggradient,
        maxgradient: data.maxgradient
      }
    }
  }).then(res => res.data)
}