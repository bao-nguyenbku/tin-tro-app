import axios from 'axios';

import { getToken } from './token';

const request = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  timeout: 20000,
});
// Set token int header
request.interceptors.request.use(async (config) => {
  const token = await getToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default request;
