import { httpClient } from "@/app/global/services";

import { apiConstants } from "../config";

const fetchData = data => {
  const url = `${apiConstants.submoduleOneEndpoint}`;
  return httpClient.get(url).then(res => res.data);
};

export { fetchData };
