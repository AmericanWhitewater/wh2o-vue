import http from "@/app/http"

export async function createReach(data) {
  
  return http.post('graphql', {
    query: `
        mutation ($reach: ReachInput!) {
          reachUpdate(reach: $reach) {
            agency
            altname
            class
            county
            description
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
            status
          }
        }
            `,
    variables: data
  }).then(res => res.data)
}