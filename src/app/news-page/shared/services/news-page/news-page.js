import { httpClient } from "../../../../global/services";

import { apiConstants } from "../../config";

const getArticleDetail = id => {
  const url = apiConstants.newsPage + id + apiConstants.format;

  return httpClient.get(url).then(res => res.data);
};

const getFrontPageArticles = () => {
  const url = apiConstants.frontPage;
  return httpClient.get(url).then(res => res.data);
};

export { getArticleDetail, getFrontPageArticles };
