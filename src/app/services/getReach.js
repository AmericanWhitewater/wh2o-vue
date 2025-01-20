import http from "@/app/http";
import { marked } from 'marked';

export async function getReach(id) {
  return http
    .post("graphql", {
      query: `
              {
                reach(id: ${id}) {
                  avggradient
                  permiturl
                  permitinfo
                  id
                  class
                  description_md
                  edited
                  length
                  maxgradient
                  plat
                  plon
                  geom
                  status
                  permissions {
                    domain
                    permission
                    result
                  }
                  readingsummary {
                      adjusted_reach_class
                      gauge_estimated
                      gauge_id
                      gauge_important
                      gauge_max
                      gauge_min
                      gauge_perfect
                      obs_id
                      range_comment
                  }
                  photo {
                    id
                    post {
                      user {
                        name
                        uid
                      }
                    }
                    image {
                      uri {
                        medium
                        big
                      }
                    }
                  }
                  river
                  section
                  altname
                }
              }
            
            `,
    })
    .then((res) => {
      if (!res.data.errors) {
        // overwrite `description` with a parsed version of the markdown database field
        // this allows us to read and render the markdown field while leaving the edit/update
        // code unchanged
        // TODO: move fully to the _md fields, including with a new editor
        res.data.data.reach.description = marked.parse(res.data.data.reach.description_md)
      }
      return res.data;
    });
}
