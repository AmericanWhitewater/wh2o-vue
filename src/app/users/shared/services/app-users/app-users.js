import { httpClient } from "../../../../global/services";

import { apiConstants } from "../../config";

const fetchUsersData = id => {
  const url = apiConstants.users + id + apiConstants.format;

  return httpClient.get(url).then(res => res.data);
};

export { fetchUsersData };
