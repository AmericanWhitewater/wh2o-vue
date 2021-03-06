import http from "@/app/http"

export async function getAffiliates() {
  return http.post('graphql', {
    query: `
      query {
        affiliates(first: 25, page: 1) {
         data {
          abstract
          city
          contact
          description
          email
          expiration
          members
          name
          state
          url
          volunteer {
            uid
            contact {
              email
              name
            }
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
  }).then(res => res.data)
}