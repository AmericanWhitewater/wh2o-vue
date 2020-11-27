import http from "@/app/http"

export async function getEvents(category, id = '') {

  if (!['event', 'release', 'other', 'festival', 'predicted_flow_source'].includes(category)) {
    throw new Error('invalid event category')
  }

  return http.post('graphql', {
    query: `
          query {
             events(event_categories: ${category.toUpperCase()}, first: 25, reach_id: ID!) {
                data {
                  id
                  title
                  url
                  dates {
                    event_date
                  }
                }
              }
          }
          `,
    variables: {
      id
    }
  }).then(res => res.data)
}