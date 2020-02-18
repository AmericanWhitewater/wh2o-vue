import { httpClient } from "@/app/global/services";

import { apiConstants } from "../../config";

const fetchRiverSearchData = data => {
  let url = apiConstants.base + apiConstants.state + data.state;

  if (data.level) {
    url += `${apiConstants.level}${data.level}`;
  }

  if (data.include) {
    url += `${apiConstants.include}${data.include}`;
  }

  if (data.atLeast) {
    url += `${apiConstants.atLeast}${data.atLeast}`;
  }

  if (data.atMost) {
    url += `${apiConstants.atMost}${data.atMost}`;
  }
  if (data.river) {
    url += `${apiConstants.river}${data.river}`;
  }

  return httpClient.get(url).then(res => res.data);
};

export { fetchRiverSearchData };
