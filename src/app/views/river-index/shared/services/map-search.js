import { httpClient } from '@/app/global/services'

const fetchRiverSearchData = query => {
  return httpClient
    .post('graphql/', {
      query: `
      {
        reachmap(first: 50, match: "skookum") {
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

export { fetchRiverSearchData }
