import http from "@/app/http"

export async function getReachDocuments(id) {
  return http
    .post('graphql', {
      query: `
        query {
            linker(source: RIVER, id: "${id}") {    
              __typename,
              data {   
                __typename
                ... on Document {
                  short_name
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
