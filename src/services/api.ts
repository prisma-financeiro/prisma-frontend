import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import cookieManager from './cookieManager';

// export const isHttpStatusError = (statusCode: number): boolean => {
//   return statusCode >= HttpStatusCode.BadRequest;
// }

export enum HttpStatusCode {
  Success = 200,
  BadRequest = 400,
  Unauthorized = 401,
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

// class AxiosWrapper {

//   private axiosApi: AxiosInstance;

//   constructor() {    
//     this.axiosApi = axios.create({
//       baseURL: process.env.REACT_APP_API_BASE_URL,
//       headers: { 'Content-Type': 'application/json' },
//     });

//     this._setAxiosDefaults();
//     this._setAxiosRequestInterceptor();
//   }

//   private _setAxiosDefaults(): void {
//     this.axiosApi.defaults.withCredentials = true;
//   }

//   private _setAxiosRequestInterceptor(): void {
//     this.axiosApi.interceptors.request.use((config: AxiosRequestConfig) => {
//       const { token } = cookieManager.getCookies();

//       if (token) {
//         config.headers.authorization = `Bearer ${token}`;
//       }

//       return config;
//     },
//       () => {
//         return new Promise(() => { });
//       }
//     );
//   }

//   public setResponseInterceptor(onFulfilled: (value: AxiosResponse<any>) => AxiosResponse<any>, onRejected: (error: any) => any) {
//     this.axiosApi.interceptors.response.use(onFulfilled, onRejected);
//   }

// }

const setRequestInterceptor = (api: AxiosInstance) => {
  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const { token } = cookieManager.getCookies();

    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }

    return config;
  },
    error => error
    // () => {
    //   return new Promise(() => { });
    // }
  );
}

const onRejectHandler = (error: any): Promise<Error> => Promise.reject(error.response ? new HttpResponseError(error.response.data) : error);

const setResponseInterceptor = (api: AxiosInstance) => {
  api.interceptors.response.use(
    res => res,
    error => onRejectHandler(error));
}

const createAxiosApi = () => {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
  });

  api.defaults.withCredentials = true;

  setRequestInterceptor(api);
  setResponseInterceptor(api);

  return api;
}

// const MINUTES_TO_CHECK_EXPIRATION_BEFORE = 5;

// const isSessionExpired = (expirationDate: Date): boolean => {
//   const currentDatetime = new Date(dayjs().add(MINUTES_TO_CHECK_EXPIRATION_BEFORE, "minutes").utc().format());
//   const expireAt = dayjs(expirationDate).toDate();

//   return currentDatetime >= expireAt;
// }

// const getNewTokenAndSetNewSessionToLocalstorage = async () => {
//   const newSession = await refreshToken();

//   if (!newSession) {
//     throw new TokenRefreshError();
//   }

//   storageManager.setUserSession(newSession);
// }

// const getRequestCallFunctionsWrappedIntoPromises = (requestCallFunctions: Function[]): Promise<void>[] => {
//   return requestCallFunctions.map(requestFunction => {
//     return new Promise<void>((resolve, _reject) => {
//       requestFunction();
//       resolve();
//     });
//   });
// }

// export const refreshTokenIfExpiredAndDoRequests = async (...args: Function[]) => {
//   try {
//     const session = storageManager.getUserSession();

//     if (isSessionExpired(session.expiresAt)) {
//       await getNewTokenAndSetNewSessionToLocalstorage();
//     }

//     const requests = getRequestCallFunctionsWrappedIntoPromises(args);

//     Promise.all(requests);
//   } catch (error) {
//     // TODO... Signout e toast que a sessao foi encerrada.   
//   }
// }

const api = createAxiosApi();

// const api = new AxiosWrapper();

export default api;