import axios from 'axios'
import { cmsBaseUrl } from '@/app/environment/environment'

const getArticleDetail = id => {
  const url = cmsBaseUrl + '/v2/posts/' + id
  return axios.get(url).then(res => res.data)
}

const getNewsArticles = () => {
  const url = cmsBaseUrl + '/v2/posts'
  return axios.get(url).then(res => res.data)
}

export { getArticleDetail, getNewsArticles }
