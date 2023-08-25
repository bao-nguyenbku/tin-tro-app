import axios from 'axios';
import { getToken } from './token';
import { API_BASE_URL } from '@/constants';


const request = axios.create({
  baseURL: 'http://192.168.1.5:5000' || API_BASE_URL,
  headers: {
    Accept: '*/*',
    Connection: 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9,vi;q=0.8',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    Pragma: 'no-cache',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
  },
  timeout: 20000,
});

const requestFile = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 20000,
});
// Set token int header
requestFile.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
// Set token int header
request.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export { request, requestFile };
