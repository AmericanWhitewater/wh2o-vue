import { httpClient } from '@/app/global/services'

const fetchNewsTabData = data => {
  return httpClient
    .post('graphql/', {
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
