import { laravelClient } from "@/app/http"

export async function getArticles() {
  return laravelClient.post('graphql', {
    query: `
        query {
          articles(first: 25, orderBy: {field: POSTED_DATE, order: ASC}, page: 1) {
          data {
            abstract
            title
            id
            author
            abstractimage {
              uri {
                big
                medium
                thumb
              }
            }
          }
        }
        }
  `,
  }).then(res => res.data)
}