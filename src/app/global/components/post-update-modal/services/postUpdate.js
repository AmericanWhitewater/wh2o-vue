import { httpClient } from '@/app/global/services'

export function postUpdate (formData) {
  return httpClient.post('/graphql', {
    query: `
      mutation ($id:ID!, $post: PostInput!) {
          postUpdate(id: $id, post:$post)  {
          id
        }
      }`,
    variables: formData
  }).then(response => {
    return response.data
  })
}
