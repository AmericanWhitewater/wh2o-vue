import http from "@/app/http"
import { marked } from 'marked';

export async function getRapids(id) {
  return http
    .post('graphql', {
      query: `
        query {
          reach(id: ${id}) {
            pois {
              approximate
              character
              description_md
              difficulty
              distance
              id
              name
              rloc
              photo {
                poi_name
                subject
                description
                author
                caption
                photo_date
                image {
                  uri {
                    thumb
                    medium
                    big
                  }
                }
                id
              }
            }
          }
        }
      `
    })
    .then(res => {
      // overwrite `description` with a parsed version of the markdown database field
      // this allows us to read and render the markdown field while leaving the edit/update
      // code unchanged
      // TODO: move fully to the _md fields, including with a new editor
      if (!res.data.errors) {
        res.data.data.reach.pois.forEach((poi) => {
          poi.description = marked.parse(poi.description_md || '');
        });

      }
      return res.data;
    })
}