import { httpClient } from '@/app/global/services'

const fetchCommentsData = data => {
  return httpClient
    .post('graphql/', {
      query: `
        query Related{
            posts(reach_id: "${data}", post_types: COMMENT, page: 1, orderBy: {field: REVISION, order: DESC}, first: 10) {
              data {
                id
                title
                detail
                post_date
                revision
                post_type
                permissions {
                  domain
                  permission
                  result
                }
                user {
                  uname
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
          }

    `
    })
    .then(res => res.data)
}

export { fetchCommentsData }
