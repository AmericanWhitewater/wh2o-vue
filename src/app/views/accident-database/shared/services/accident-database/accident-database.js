import { httpClient } from "@/app/global/services";

import { apiConstants } from "../../config";

const getAccidentDatabase = data => {
  const url = `${apiConstants.graphql}`;
  return httpClient
    .post(url, {
      query: `
      query {
        reach(id:${data}){
          accidents(first:100, page:1){
            data {
                # causes,
                # factors,
                # injury,
                age,
                boattype,
                cause,
                contact,email,
                contactname,
                contactphone,
                countryabbr,
                description,
                difficulty,
                experience,
                groupinfo,
                location,
                numvictims,
                othervictimnames,
                privcomm,
                rellevel,
                river,
                section,
                state,
                status,
                type,
                victimname,
                waterlevel,
            }
        }
      }
    }
    
    `
    })
    .then(res => res.data);
};
export { getAccidentDatabase };
