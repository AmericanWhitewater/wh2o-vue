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

export async function deletePost(id) {
  return http.post('/graphql', {
    query: `
          mutation ($id:ID!) {
            postDelete(id: $id)  {
            id
          }
        }`,
    variables: {
      id
    }
  }).then(res => res.data)
}

/**
 * @note redundant.
 */
export async function deleteComment(id) {
  return http.post('/graphql', {
    query: `
            mutation ($post_id:ID!){postDelete(id:$post_id){id}}
          `,
    variables: {
      post_id: id
    }
  }).then(res => res.data)
}