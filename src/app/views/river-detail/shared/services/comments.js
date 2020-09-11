import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchCommentsData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
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
