import { laravelClient } from "@/app/http"

export async function getDocuments() {
  return laravelClient.post('graphql', {
    query: `
      query {
        __typename
      documents(first: 25, page: 1) {
        data {
          abstract
            description
            document
            document_size
            id
            uri
            user {
              uid
            }
            edit_date
            author {
              id
              name
            }
        }
        paginatorInfo {
          count
          currentPage
          total
          perPage
        }
  }
      }
  `,
  }).then(res => res.data.data.documents.data)
}