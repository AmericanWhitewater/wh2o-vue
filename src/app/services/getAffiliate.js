import { laravelClient } from "@/app/http"

export async function getAffiliate(id) {
  return laravelClient.post('graphql', {
    query: `
      query {
        affiliate(id: !ID) {
          abstract
          city
          contact
          description
          email
          expiration
          members
          name
          state
          url
          volunteer {
            email
            uid
            uname
          }
        }  
      }
    `,
    variables: {
      id
    }
  }).then(res => res.data)
}