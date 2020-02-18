import { httpClient } from "@/app/global/services";

import { apiConstants } from "../config";

const userForgot = data => {
  const url = `${apiConstants.forgot}URL`;

  return httpClient.post(url, data).then(res => res.data);
};

export { userForgot };
