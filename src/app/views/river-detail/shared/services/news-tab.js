import { httpClient } from '@/app/global/services'

import { apiConstants } from '../config'

const fetchNewsTabData = data => {
  const url = `${apiConstants.graphql}`
  return httpClient
    .post(url, {
      query: `
        query {
            getRiverArticles(id: ${data}) {
                articles {
                abstract
                image {
                  uri {
                    thumb
                    medium
                    big
                  }
                }
                author
                posted_date
                title
                contents
                id
                }
            }
        }`
    })
    .then(res => res.data)
}

export { fetchNewsTabData }
