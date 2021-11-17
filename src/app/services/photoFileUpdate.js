import gql from 'graphql-tag'

export async function photoFileUpdate($apollo, data) {
  const id = data.photo.id;
  const photo = Object.assign({}, data.photo);
  delete photo.id;
  const fileinput = Object.assign({}, data.fileinput);

  return $apollo.mutate({
    mutation: gql`mutation ($fileinput: PhotoFileInput!, $id:ID!, $photo: PhotoInput!) {
          photo: photoFileUpdate(fileinput: $fileinput, id: $id, photo:$photo)
          {
            id,
            caption,
            post_id,
            description,
            subject,
            photo_date,
            author,
            poi_name,
            poi_id
            image {
                ext,
                uri {
                    thumb,
                    medium,
                    big
                }
            }
          }
        }`,
    variables: {
      id: id,
      photo: photo,
      fileinput: fileinput
    }
  }).then(res => res.data.photo);
}