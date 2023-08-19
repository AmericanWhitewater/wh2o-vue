import { laravelClient } from "@/app/http" 

export async function getReachProjects(id) {
  return laravelClient
    .post('graphql/', {
      query: `
      {
        linker(source: RIVER, id: "${id}") {
          type
          data {
            __typename
            ... on Project {
              id
              name
              description
            }
          }
        }
      }
      `
    })
    .then(res => res.data)
}