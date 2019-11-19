import { httpClient } from "../../../global/services";

import { apiConstants } from "../config";

const userLogin = data => {
  const url = apiConstants.login + "URL";

  return httpClient.post(url, data).then(res => res.data);
};

export { userLogin };
