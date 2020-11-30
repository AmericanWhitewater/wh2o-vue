import http from "@/app/http"

export async function searchReachMap(data) {
  return http.post('graphql/', {
    query: `
      {
        reachmap(first: 50, match: "${data}") {
          data {
            id
            river
            section
            altname
            class
            abstract
            geom
            states {
              shortkey
            }
            readingsummary {
              reading
              gauge_reading
              updated
              gauge_id
              metric {
                unit
              }
              gauge {
                id
                name
              }
            }
          }
        }
      }      
      `
  }).then(res => res.data)
}