import { laravelClient } from "@/app/http"
import { marked } from 'marked';

export async function getReachGallery(id, pagination) {
  return laravelClient
    .post('/graphql', {
      query: `
        query {
          reach(id: ${id}) {
            photos(
              first: ${pagination.perPage},
              page: ${pagination.page}, 
              orderBy: [{field: REVISION, order: DESC}]
            ) {
              data {
                id
                author
                caption
                description_md
                photo_date
                poi_name
                poi_id
                subject

                post {
                  id
                  metric_id
                  post_date
                  post_type
                  reading
                  metric {
                    name
                    unit
                  }
                  gauge {
                    id
                    name
                  }
                }
                permissions {
                  domain
                  permission
                  result
                }
                image {
                  uri {
                    thumb
                    medium
                    big
                  }
                  file_size
                }
              }
              paginatorInfo {
                count
                perPage
                currentPage
                lastPage
                total
              }
            }  
          }
        }`
    })
    .then(res => {
      if (!res.data.errors) {
        // overwrite `description` with a parsed version of the markdown database field
        // this allows us to read and render the markdown field while leaving the edit/update
        // code unchanged
        // TODO: move fully to the _md fields, including with a new editor
        res.data.data.reach.photos.data.forEach((photo) => {
          photo.description = marked.parse(photo.description_md || '');
        });
      }

      return res.data;
    })
}