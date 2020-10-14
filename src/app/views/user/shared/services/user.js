import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchUserData = () => {
  const url = `${apiConstants.graphql}`

  return httpClient.post(url, {
    query: `
    query {
        me {
          uid
          email
          mobile_profile
          gauge_notification {
            gauge_id
          }
          permissions
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
