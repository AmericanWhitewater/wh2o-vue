import { laravelClient } from "@/app/http"

export async function searchReachMap(data) {
  return laravelClient.post('graphql/', {
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
              gauge_estimated
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