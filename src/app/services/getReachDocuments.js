import { laravelClient } from "@/app/http"

export async function getReachDocuments(id) {
  return laravelClient
    .post('graphql', {
      query: `
        query {
            linker(source: RIVER, id: "${id}") {    
              __typename,
              data {   
                __typename
                ... on Document {
                  id
                  short_name
                  edit_date
                  abstract
                  document
                  title
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
