import http from "@/app/http"

export async function getProjects() {
  return http.post('graphql', {
    query: `
      query {
        projects(first: 25, page: 1) {
          data {
            description
            edit_date
            id
            name
            short_name
            user {
              uid
              uname
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
  }).then(res => res.data.data.projects.data)
}