import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import cookieManager from './cookieManager';

export const isHttpStatusError = (statusCode: number): boolean => {
  return statusCode >= HttpStatusCode.BadRequest;
}

export enum HttpStatusCode {
  Success = 200,
  BadRequest = 400,
  InternalServerException = 500
}

export class HttpResponseError extends Error {
  private _status: number;
  private _code: string;

  constructor({ status, code, message }: any) {
    super();
    this._status = status;
    this.message = message;
    this._code = code;
  }

  public get status(): number {
    return this._status;
  }

  public get code(): string {
    return this._code;
  }

}

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