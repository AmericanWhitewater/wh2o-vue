import { httpClient } from "@/app/global/services";

import { apiConstants } from "../../config";

const fetchRapidsData = data => {
  const url = `${apiConstants.graphql}`;
  return httpClient
    .post(url, {
      query: `
        query {
          reach(id:${data}) {
            rapids {
                name,
                photo {
                  file {
                    uri {
                      thumb
                    }
                  }
                },
                isputin,
                istakeout,
                isaccess,
                isportage,
                ishazard,
                iswaterfall,
                isplayspot,
                distance,
                difficulty,
                description,
                approximate
          }
        }
      }
    
    `
    })
    .then(res => res.data);
};

export { fetchRapidsData };