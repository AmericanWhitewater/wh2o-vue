import { httpClient } from '@/app/global/services'

import { apiConstants } from '../../config'

const fetchGalleryData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id:${data}){
          photos(first: 50,page:1) {
            data {
              image {
                uri {
                  big
                  medium
                  thumb
                }
              }
              post {
                reading
                detail
                user {
                  uname
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

export { fetchGalleryData }
