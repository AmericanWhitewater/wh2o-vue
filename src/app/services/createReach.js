import { laravelClient } from "@/app/http"

export async function createReach(data) {
  
  return laravelClient.post('graphql', {
    query: `
        mutation ($reach: ReachInput!) {
          reachUpdate(reach: $reach) {
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
            status
          }
        }
            `,
    variables: data
  }).then(res => res.data)
}