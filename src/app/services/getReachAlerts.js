import http from "@/app/http"

export async function getReachAlerts(id) {

  return http
    .post('/graphql', {
      query: `
        query {
            posts(reach_id: "${id}", post_types: WARNING, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
              data {
                id
                title
                detail_md
                post_date
                revision
                post_type
                permissions {
                  domain
                  permission
                  result
                }
                user {
                  name
                  uid
                  image {
                    uri {
                      thumb
                      medium
                      big
                    }
                  }
                }
              }
            }
          }`
    })
    .then(res => {
      if (!res.data.errors) {
        // NOTE: we are *not* processing the _md field here because alerts are, in practice, plain text,
        // and converting the field back from markdown to HTML adds <p> tags, but in the interest of
        // parity with mobile app, we still want to read the _md field
        // TODO: remodel alerts as separate from other post types
        res.data.data.posts.data.forEach((report) => {
          report.detail = report.detail_md;
        });
      }

      return res.data;
    })
}