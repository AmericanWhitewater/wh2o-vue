import http from "@/app/http"

export async function createReach(data) {
  
  return http.post('graphql', {
    query: `
        mutation ($id:ID!, $reach: ReachInput!) {
          reachUpdate(id: $id, reach: $reach) {
            agency
            altname
            class
            county
            description
            gaugeinfo
            geom
            id
            length
            permitinfo
            permiturl
            ploc
            river
            section
            tloc
            zipcode
          }
        }
            `,
    variables: data
  }).then(res => res.data)
}