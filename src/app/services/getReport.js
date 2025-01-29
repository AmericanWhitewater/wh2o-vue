import http from "@/app/http"
import { marked } from 'marked';

export async function getReport(id) {

  return http
    .post('graphql', {
      query: `
        query {
            posts(
              first: 1,
              id: "${id}"
              ) {
                 data {
                    detail_md
                    id
                    title
                    reading
                    post_type
                    post_date
                    reach_id
                    observation
                    photos {
                      id
                      created_at
                      image {
                        uri {
                          big
                          medium
                          thumb
                        }
                        file_size
                      }
                      author
                      caption
                      description
                      photo_date
                      poi_name
                      poi_id
                      subject
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
                    gauge {
                      id
                      name
                    }
                    metric {
                      id
                      name
                      unit
                    }
                  }
            }
          }
    `
    })
    .then(res => {
      const post = res.data.data.posts.data[0];
      // overwrite `detail` with a parsed version of the markdown database field
      // this allows us to read and render the markdown field while leaving the edit/update
      // code unchanged
      // TODO: move fully to the _md fields, including with a new editor
      if (post) {
        post.detail = marked.parse(post.detail_md || '');
      }
      return post;
    })
}
