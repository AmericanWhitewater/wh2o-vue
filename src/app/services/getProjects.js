import { laravelClient } from "@/app/http"

export async function getProjects() {
  return laravelClient.post('graphql', {
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
  }).then(res => res.data.data.projects.data)
}