import http from "@/app/http"

export async function createReach(data) {
  
  return http.post('graphql', {
    query: `
        mutation ($id:ID!, $reach: ReachInput!) {
          reachUpdate(id: $id, reach: $reach) {
            county
            id
            class
            description
            edited
            edited
            length
            maxgradient
            ploc
            tloc
            geom
            river
            permiturl
            permitinfo
            section
          }
        }
            `,
    variables: data
  }).then(res => res.data)
}