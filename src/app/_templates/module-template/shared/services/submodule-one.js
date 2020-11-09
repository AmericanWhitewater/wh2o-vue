import { httpClient } from "@/app/global/services";

const fetchSubmoduleOneData = () => {
  return httpClient.get("/graphql").then((res) => res.data);
};

export { fetchSubmoduleOneData };
