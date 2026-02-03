import { laravelClient } from "@/app/http";

export async function updatePost(data) {
  const id = data.id;
  const post = Object.assign({}, data);
  delete post.id;

  return laravelClient
    .post("/graphql", {
      query: `
      mutation ($id:ID!, $post: PostInput!) {
        postUpdate(id: $id, post:$post)  {
          detail
          title
          gauge_id
          metric_id
          observation
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
      variables: {
        id: id,
        post: post
      },
    })
    .then((response) => {
      return response.data;
    });
}
