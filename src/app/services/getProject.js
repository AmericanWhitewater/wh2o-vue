import { laravelClient } from "@/app/http"

export async function getProject(id) {
  return laravelClient.post('graphql', {
    query: `
       query { 
          project(id: ID!) {
            description
            edit_date
            id
            name
            short_name
          }
       }
          `,
    variables: {
      id
    }
  }).then(res => res.data)
}