import http from '@/app/http'

export async function updatePost(formData) {
  return http.post('/graphql', {
    query: `
      mutation ($id:ID!, $post: PostInput!) {
          postUpdate(id: $id, post:$post)  {
          id
          detail
          title
          gauge_id
          metric_id
          post_date
          post_type
          reach_id
          reading
          title
          user {
            uid
          }
        }
      }`,
    variables: formData
  }).then(response => {
    return response.data
  })
}
