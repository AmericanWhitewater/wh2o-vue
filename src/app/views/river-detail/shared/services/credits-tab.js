import { httpClient } from '@/app/global/services'

const fetchCreditsData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        reach( id: ${data}) {
            revisions(first:100,page:0){
            data {
                id
                revision
                sk {
                    uname
                    contact {
                        name  
                    }
                }
                revision_comment
                edited
                }
            }
        }
    }`
    })
    .then(res => {
      return res.data
    })
}

export { fetchCreditsData }
