import http from "@/app/http"

export async function getReachReleases(id) {
  return http
    .post('graphql', {
      query: `
        query {
          events(first: 10, event_categories: CAT_RELEASE, reach_id: "${id}") {
            data {
              url
              title
              state
              orgemail
              description
              dates {
                event_date
              }
              city
            }
          }
        }`
    })
    .then(res => res.data.data.events.data)
}