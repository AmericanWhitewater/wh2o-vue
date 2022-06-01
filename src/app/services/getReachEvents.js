import http from "@/app/http"

export async function getReachEvents(id) {
  return http
    .post('graphql', {
      query: `
        query {
            reach(id: "${id}") {
              events 
              {
                id,
                category
                title,
                dates { id,event_date,min,max,id,metric_id,start_time,end_time }  
             
              }
                 
         
            }
        }`
    })
    .then(res => res.data.data.reach.events)
}
