import http from "@/app/http"

export async function getStateList() {
  return http.post('/graphql', {
    query: `
            query {
                  states(first:100,aw_only:true){data{gmi,name,shortkey,type,aw_region,num_rivers,num_gauges}}
            }
        `
  })
}