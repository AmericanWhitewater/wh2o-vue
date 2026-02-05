import { laravelClient } from "@/app/http";

export async function photoFileUpdate(data) {
  const id = data.photo.id;
  const photo = Object.assign({}, data.photo);
  delete photo.id;
  const fileinput = Object.assign({}, data.fileinput);
  const file = fileinput.file;

  // Prepare the operations object with file replaced by null
  const operations = {
    query: `
      mutation ($fileinput: PhotoFileInput!, $id:ID!, $photo: PhotoInput!) {
        photo: photoFileUpdate(fileinput: $fileinput, id: $id, photo:$photo) {
          id
          caption
          post_id
          description
          subject
          photo_date
          author
          poi_name
          poi_id
          image {
            ext
            uri {
              thumb
              medium
              big
            }
          }
        }
      }`,
    variables: {
      id: id,
      photo: photo,
      fileinput: {
        ...fileinput,
        file: null
      }
    }
  };

  // Create FormData for multipart request
  const formData = new FormData();
  formData.append('operations', JSON.stringify(operations));
  formData.append('map', JSON.stringify({ "0": ["variables.fileinput.file"] }));
  formData.append('0', file);

  return laravelClient
    .post("/graphql", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => response.data.photo);
}