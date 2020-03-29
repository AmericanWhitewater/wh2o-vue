import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchGalleryData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      {
        reach(id: ${data}) {
          photos(first: 20, page: 1) {
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
                  uid
                }
                title
              }
              poi_name
              poi_id
              caption
              description
              author
              photo_date
              id
              subject
              url
              revision
            }
          }
        }
      }`
    })
    .then(res => res.data)
}

export { fetchGalleryData }
