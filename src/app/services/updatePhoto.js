import http from "@/app/http";

export async function updatePhoto(data) {
  const id = data.id;
  const photo = Object.assign({}, data);
  delete photo.id;

  return http
    .post("/graphql", {
      query: `
      mutation ($id:ID!, $photo: PhotoInput!) {  
        photoUpdate(id: $id, photo: $photo) {
          caption,
          post_id,
          description,
          subject,
          photo_date,
          author,
          poi_name,
          poi_id
        }
      }`,
      variables: {
        id: id,
        photo: photo
      },
    })
    .then((response) => {
      return response.data;
    });
}
