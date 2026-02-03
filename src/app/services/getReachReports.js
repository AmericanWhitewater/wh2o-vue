import { laravelClient } from "@/app/http"
import { marked } from 'marked';

export async function getReachReports(id, pagination) {

  return laravelClient
    .post('graphql', {
      query: `
        query {
            posts(
              reach_id: "${id}",
              first: ${pagination.perPage},
              page: ${pagination.page},
              post_types:[JOURNAL],
              orderBy: {field: POST_DATE, order: DESC}
              ) {
                 data {
                    detail_md
                    id
                    title
                    reading
                    post_date
                    reach_id
                    observation
                    photos {
                      created_at
                      url
                      id
                      image {
                        uri {
                          big
                          medium
                          thumb
                        }
                      }
                    }
                    permissions {
                      domain
                      permission
                      result
                    }
                    user {
                      uid
                      name
                      image {
                        uri {
                          big
                          medium
                          thumb
                        }
                      }
                    }
                  }

                  paginatorInfo {
                    count
                    perPage
                    currentPage
                    lastPage
                    total
                  }
            }
          }
    `
    })
    .then(res => {
      if (!res.data.errors) {
        // overwrite `detail` with a parsed version of the markdown database field
        // this allows us to read and render the markdown field while leaving the edit/update
        // code unchanged
        // TODO: move fully to the _md fields, including with a new editor
        res.data.data.posts.data.forEach((report) => {
          report.detail = marked.parse(report.detail_md || '');
        });
      }

      return res.data;
    })
    
}