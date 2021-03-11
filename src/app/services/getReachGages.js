import http from "@/app/http";

export async function getReachGages(id) {
  return http
    .post("/graphql", {
      query: `{
        getGaugeInformationForReachID(id: ${id}) {
        
        metrics {
                        name
                        unit
                        format
                        id
                        shortkey
                      }
          ranges{
            range_min,
            range_max,
            min,
            max,
            time_adjustment,
            range_comment, 
            gauge_perfect,
            gauge_estimated,
            adjusted_reach_class,
            gauge_important,
            gauge_metric,
            gauge_id,
          },
          gauges {
              rc
              epoch
              time_adjustment,
              gauge_reading
              gauge_metric
              gauge_comment
              delay_update             
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
