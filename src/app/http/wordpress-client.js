import axios from 'axios'
import { wpApiUrl } from '@/app/environment'

const config = {
  baseURL: wpApiUrl
};

const http = axios.create(config);

export default http;
