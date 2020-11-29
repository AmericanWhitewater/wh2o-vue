import http from "@/app/http"

export async function getArticle(id) {
  return http.post('graphql', {
    query: `
       query {
          article(id: "${id}") {
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
  }).then(res => res.data.data.article)
}

export async function getArticles() {
  return http.post('graphql', {
    query: `
        query {
          articles(first: 25, orderBy: {field: POSTED_DATE, order: DESC}, page: 1) {
          data {
            abstract
            title
            id
            author
            posted_date
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
  }).then(res => res.data.data.articles.data)
}

export async function updateArticle(data) {
  return http.post('graphql', {
    query: `
      mutation ($id:ID!, $article:ArticleInput!) {
        articleUpdate (id: $id, article:$article) {
          id
        }
      }
    `,
    variables: data
  }).then(res => res.data.data.articleUpdate)
}

export async function deleteArticle(id) {
  return http.post('graphql', {
    query: `
      mutation {
        articleDelete (id: "${id}") {
          id
        }
      }
    `
  }).then(res => res.data.data.articleDelete)
}
