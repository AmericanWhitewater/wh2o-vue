import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const userLogin = data => {
  const url = `${apiConstants.graphql}`

  return httpClient.post(url, {
    query: `
    mutation {
        login(input: ${data}) {
          access_token
          expires_in
          refresh_token
          token_type
        }
      }

    `
  }).then(res => res.data)
}

export { userLogin }
