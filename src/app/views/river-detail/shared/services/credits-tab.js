import { httpClient } from '@/app/global/services'

const fetchCreditsData = data => {
  return httpClient
    .post('/graphql', {
      query: `
      query {
        reach( id: ${data}) {
            revisions(first:100,page:0){
            data {
                id,
                revision, 
                sk{uname},
                revision,
                revision_comment,
                edited
                }
            }
        }
    }`
    })
    .then(res => res.data)
}

export { fetchCreditsData }
