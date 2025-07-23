import { laravelClient } from "@/app/http"

// returns a list of report titles and whether or not the user can edit them
export async function getAllReachReports(id) {

  return laravelClient
    .post('graphql', {
      query: `
        query {
            posts(
              reach_id: "${id}",
              first: 2500,
              page: 1,
              post_types:[JOURNAL],
              orderBy: {field: POST_DATE, order: DESC}
              ) {
                 data {
                    id
                    title
                    post_date
                    permissions {
                      domain
                      permission
                      result
                    }
                    user {
                      name
                    }
                  }
            }
          }
    `
    })
    .then(res => res.data)
}