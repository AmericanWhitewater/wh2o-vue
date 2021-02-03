import http from "@/app/http";

export async function updatePost(formData, photo) {
  const variables = {
    id: formData.id,
    post: formData.post
  };
  if (photo) {
    // if post is coming in with an ID then remove that property.
    const photoCopy = Object.assign({}, photo);
    delete photoCopy.id;
    photoCopy.post_id = formData.id;
    variables.photo = photoCopy;
    variables.photo_id = photo.id;
  }
  return http
    .post("/graphql", {
      query: `
      mutation ($id:ID!, ${photo ? "$photo_id: ID!, $photo: PhotoInput!, " : ''}$post: PostInput!) {
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
        ${photo ?  "photoUpdate(id: $photo_id, photo: $photo) { id }," : '' }
      }`,
      variables: variables,
    })
    .then((response) => {
      return response.data;
    });
}
