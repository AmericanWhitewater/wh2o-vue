import { laravelClient } from "@/app/http"

export async function getReachMap(id) {
  return laravelClient
    .post('/graphql', {
      query: `
                query {
                  
                    reach(id: "${id}") {
                      direction_default
                      custom_destination
                      county
                      permitid
                      permitinfo
                      permiturl
                      shuttledetails
                      zipcode
                      geom
                    }

              }
              
              `
    })
    .then(res => res.data)
}