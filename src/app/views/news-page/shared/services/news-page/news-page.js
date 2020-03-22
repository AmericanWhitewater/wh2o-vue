import axios from 'axios'
import { httpClient } from '@/app/global/services'
import { cmsBaseUrl } from '@/app/environment/environment'
import { apiConstants } from '../../config'
const getArticleDetail = id => {
  const url = `/content/Article/view/articleid/${id}/.json`
  return httpClient.get(url).then(res => res.data)
}

const getNewsArticles = () => {
  const url = cmsBaseUrl + '/v2/posts'
  return axios.get(url).then(res => res.data)
}

const searchArticles = (term) => {
  const url = cmsBaseUrl + '/v2/posts?content=' + term
  return axios.get(url).then(res => res.data)
}

const getFeaturedMedia = (id) => {
  const url = cmsBaseUrl + '/v2/media/' + id
  return axios.get(url).then(res => res.data)
}
const getFrontPageNews = () => {
  const url = apiConstants.frontPageNews
  return httpClient.get(url).then(res => res.data)
}

export { getArticleDetail, getNewsArticles, searchArticles, getFeaturedMedia, getFrontPageNews }
