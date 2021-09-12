import http from "@/app/http"

export async function getReachEvents(id) {
  return http
    .post('graphql', {
      query: `
        query {
            linker(source: RIVER, id: "${id}") {    
              __typename,
              data {   
                __typename
                ... on Event {        
                  id,
                  category
                title,
                  dates { id,event_date,min,max,id,metric_id,start_time,end_time }      
                }
                ... on Document {
                  
                  short_name
                  abstract
                  document
                  uri
                  author {
                    name
                  }
                }
              }
            }
        }`
    })
    .then(res => res.data.data.linker)
}