import http from "@/app/http"

// this is passed a "target id" that represents the reach's gauge record
export async function getGaugeCorrelations(id) {
  return http.post('graphql', {
    query: `
      query ($targetid: Int) {
        gaugeCorrelations(targetid: $targetid) {
          source {
            id
            name
            source
            source_id
          }
          time_adjustment
          metric {
            id
            unit
            name
          }
          estimated
          id
          excluded
          delay_update
          ranges {
            id
            max
            min
            permissions{result,domain,permission}
          }
          permissions{result,permission}
        }
      }
      `,
    variables: {
      targetid: id
    }
  }).then(res => res.data.data);
}
