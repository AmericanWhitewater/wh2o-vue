import { httpClient } from '@/app/global/services'

import { apiConstants } from '../../config'

const fetchRiverDetailData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      {
        reach(id: ${data}) {
          avggradient
          class
          description
          edited
          edited
          length
          maxgradient
          plat
          plon
          photo {
            id
            post {
              user {
                uname
                uid
              }
            }
            image {
              uri {
                medium
                big
              }
            }
          }
          river
          section
        }
      }
    
    `
    })
    .then(res => res.data)
}

export { fetchRiverDetailData }
