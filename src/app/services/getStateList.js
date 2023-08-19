import { laravelClient } from "@/app/http"

export async function getStateList() {
  return laravelClient.post('/graphql', {
    query: `
            query {
                  states(first:150,aw_only:true){data{gmi,name,shortkey,type,aw_region,num_rivers,num_gauges}}
            }
        `
  })
}