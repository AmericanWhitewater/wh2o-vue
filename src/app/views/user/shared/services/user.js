import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchUserData = data => {
  const url = `${apiConstants.graphql}`

  return httpClient.post(url, {
    query: `
    query {
        me {
          uid
          email
          image {
            uri {
              big
              medium
              thumb
            }
          }
          uname
        }
      }
    `
  }).then(res => res.data)
}

export { fetchUserData }
