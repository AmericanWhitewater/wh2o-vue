import { httpClient } from '@/app/global/services'

// import { apiConstants } from "../../config";

const fetchLandingArticles = () => {
  const url = '/content/News/all/type/frontpagenews/subtype//page/0/.json'
  return httpClient.get(url).then(res => res.data)
}

export { fetchLandingArticles }
