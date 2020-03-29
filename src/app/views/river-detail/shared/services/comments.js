import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchCommentsData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
        query {
        reach(id: ${data}) {
            posts(post_type: COMMENT, first: 10, page: 1) {
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
        }    
    `
    })
    .then(res => res.data)
}

export { fetchCommentsData }
