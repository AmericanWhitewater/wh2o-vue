import axios from 'axios'
import { wpApiUrl } from '@/app/environment'

const config = {
  baseUrl: wpApiUrl
};

const http = axios.create(config);

export default http;
