import { httpClient } from '@/app/global/services'

const fetchCreditsData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        reach(id:${data}){
          revision_comment
          revision
      }
    }
    
    `
    })
    .then(res => res.data)
}

export { fetchCreditsData }
