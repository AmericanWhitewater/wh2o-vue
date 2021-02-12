import http from "@/app/http";

export async function getReachGages(id) {
  return http
    .post("/graphql", {
      query: `{
        getGaugeInformationForReachID(id: ${id}) {
          gauges {
              rc
              epoch
              gauge_reading
              gauge_metric
              gauge_comment
              range_comment
              class
              excluded
              rmin
              rmax
              gauge {
                  name
                  id
                  source
                  source_id
                  updates {
                    metric {
                        id 
                        name 
                    }
                  }
              }
              updated
              last_gauge_reading
              last_gauge_updated
              gauge_perfect
              adjusted_reach_class
            }
          }
        }`,
    })
    .then((res) => res.data);
}
