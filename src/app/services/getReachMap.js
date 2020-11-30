import http from "@/app/http"

export async function getReachMap(id) {
  return http
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