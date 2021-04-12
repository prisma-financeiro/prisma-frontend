import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { ConnectionRefusedError, TokenRefreshError } from '../exceptions';
import { Session } from '../models';
import localStorageManager from '../utils/LocalStorageManager';
import cookieManager from './cookieManager';
import history from './history';
import { refreshToken } from './login';

export enum HttpStatusCode {
  Success = 200,
  BadRequest = 400,
  Unauthorized = 401,
  InternalServerException = 500
}

const handleGetNewSessionResponse = (session: Session) => {
  if (!session.token) {
    throw new TokenRefreshError();
  }

  return session;
}

const isConnectionRefusedError = (error: any) => {
  return !error.response;
}

const handleGetNewSessionError = (error: any) => {
  if (isConnectionRefusedError(error)) {
    throw new ConnectionRefusedError();
  } else {
    throw new TokenRefreshError();
  }
}

const getNewSession = async () => {
  return await refreshToken()
    .then((session: Session) => handleGetNewSessionResponse(session))
    .catch(error => handleGetNewSessionError(error));
}

const getNewTokenAndSetNewSessionToLocalstorage = async () => {
  const newSession = await getNewSession();
  localStorageManager.setUserSession(newSession);

  return newSession.token;
}

let isRefreshing = false;
let isConnectionRefused = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const setRequestInterceptor = (api: AxiosInstance) => {

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = cookieManager.getCookie('token');

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
    error => error
  );
}

const setResponseInterceptor = (api: AxiosInstance) => {

  api.interceptors.response.use(
    response => {
      return response;
    },
    err => {
      const originalRequest = err.config;

      if (err.response && err.response.status === 401 && !originalRequest?._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers.authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, _reject) => {
          getNewTokenAndSetNewSessionToLocalstorage()
            .then(token => {
              processQueue(null, token);
              originalRequest.headers.authorization = `Bearer ${token}`;
              resolve(axios(originalRequest));
            })
            .catch(() => {
              failedQueue = [];
              history.push("/");

              return new Promise(() => { });
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }

      if (!err.response && !isConnectionRefused) {
        isConnectionRefused = true;
        toast.error("Ops, algo deu errado, tente novamente em instântes.");
        return new Promise(() => { });
      }

      if (err.response && isConnectionRefused) {
        isConnectionRefused = false;
      }

      return Promise.reject(err);
    }
  );
}

const createAxiosApi = () => {

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.defaults.withCredentials = true;

  setResponseInterceptor(api);
  setRequestInterceptor(api);

  return api;
}

const api: AxiosInstance = createAxiosApi();

export default api;