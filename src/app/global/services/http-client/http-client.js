import axios from "axios";

import { apiBaseUrl } from "../../../environment/environment";

const config = {
  baseURL: apiBaseUrl
};

const httpClient = axios.create(config);

const authToken = "123456789";

const headers = config => {
  const data = {
    origin: "same-site"
  };
  config.headers = data;

  return config;
};

const authInterceptor = config => {
  config.headers.Authorization = authToken;
  return config;
};

const loggerInterceptor = config =>
  /** Add logging here */
  config;
/** Adding the request interceptors */
httpClient.interceptors.request.use(headers);
httpClient.interceptors.request.use(authInterceptor);
httpClient.interceptors.request.use(loggerInterceptor);

/** Adding the response interceptors */
httpClient.interceptors.response.use(
  response => response,
  error =>
    /** Do something with response error */
    Promise.reject(error)
);

export { httpClient };
