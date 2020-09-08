import { httpClient } from '@/app/global/services'
const fetchStates = () => {
  return httpClient.post('/graphql', {
    query: `
            query {
                  states(first:100,aw_only:true){data{gmi,name,shortkey,type,aw_region}}
            }
        `
  }).then(r => {
    return r.data
  })
}

export { fetchStates }
