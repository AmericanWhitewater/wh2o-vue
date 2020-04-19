import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchGalleryData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
      query {
        posts(first: 50, post_types: JOURNAL, reach_id: "${data}", page: 1, orderBy: {field: REVISION, order: ASC}) {
          data {
            id
            reading
            post_date
            photos {
              image {
                uri {
                  thumb
                  medium
                  big
                }
              }
              id
              author
              caption
              description
              photo_date
              poi_name
              poi_id
              subject
            }
          }
        }
      }`
    })
    .then(res => res.data)
}

export { fetchGalleryData }
