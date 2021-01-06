import gql from 'graphql-tag'

export async function photoFileUpdate($apollo, data) {
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
      ...data
    }
  }).then(res => res.data)
  //   .then(result => {

  // }).catch(err => {
  //   /* eslint-disable-next-line no-console */
  //   console.log(err)
  //   this.$emit('form:error')
  //   this.$store.dispatch('Global/sendToast', {
  //     title: 'Upload Failed',
  //     kind: 'error'
  //   })
  // })
}