import { httpClient } from "@/app/global/services";

const fetchSubmoduleTwoData = () => {
  return httpClient.get("/graphql").then((res) => res.data);
};

export { fetchSubmoduleTwoData };
