import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import cookieManager from './cookieManager';

const createRequestInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const { token } = cookieManager.getCookies();

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
    () => {
      return new Promise(() => { });
    }
  );
}

const createAxiosApi = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.defaults.withCredentials = true;

  createRequestInterceptor(api);

  return api;
}

const api = createAxiosApi();

export default api;