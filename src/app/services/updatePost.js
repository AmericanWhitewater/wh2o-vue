import http from "@/app/http";

export async function updatePost(formData, photo) {
  //if post is coming in with an ID then remove that property.
  const photoCopy = JSON.parse(JSON.stringify(photo));
  delete photoCopy.id;
  photoCopy.post_id = formData.id;
  return http
    .post("/graphql", {
      query: `
      mutation ($id:ID!, $photo_id: ID!, $photo: PhotoInput!, $post: PostInput!) {
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
        photoUpdate(id: $photo_id, photo: $photo)
          {
            id
          },
      }`,
      variables: {
        id: formData.id,
        post: formData.post,
        photo: photoCopy,
        photo_id: photo.id,
      },
    })
    .then((response) => {
      return response.data;
    });
}
