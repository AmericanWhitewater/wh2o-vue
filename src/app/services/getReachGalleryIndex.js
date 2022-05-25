import http from "@/app/http"

export async function getReachGalleryIndex(id) {
  return http
    .post('/graphql', {
      query: `
        query {
          reach(id: ${id}) {
            photos(
              first: 2500,
              orderBy: [{field: DATE, order: DESC}, {field: POST_DATE, order: DESC}, {field: CREATED_DATE, order: DESC}],
              page: 1
            ) {
              data {
                id
              }
            }
          }
        }`
      }).then(res => res.data)
}