import { httpClient } from "../../../../global/services";

import { apiConstants } from "../../config";

const fetchCreditsData = data => {
  const url = apiConstants.credits + data;

  return httpClient.get(url).then(res => res.data);
};

export { fetchCreditsData };
