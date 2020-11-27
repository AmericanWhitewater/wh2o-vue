import http from "@/app/http"

export async function getArticle(id) {
  return http.post('graphql', {
    query: `
       query {
          article(id: ID!) {
            abstract
            abstractimage {
              uri {
                medium
                big
                thumb
              }
            }
            author
            contents
            image {
              uri {
                thumb
                medium
                big
              }
            }
            posted_date
            title
            uid
          }
       }
          `,
    variables: {
      id
    }
  }).then(res => res.data)
}

export async function getArticles() {
  return http.post('graphql', {
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