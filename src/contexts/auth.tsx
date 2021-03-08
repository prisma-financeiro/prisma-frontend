import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';

import { Session, Account, SignIn } from '../models';
import cookieManager from '../services/cookieManager';
import localStorageManager from '../utils/LocalStorageManager';
import { refreshToken } from '../services/login';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import history from '../services/history';
import { ConnectionRefusedError } from '../exceptions';
import { toast } from 'react-toastify';

dayjs.extend(utc);

class TokenRefreshError extends Error {
  constructor() {
    super();
    this.message = "Não foi possível atualiazar a sessão.";
  }
};

export type AuthState = {
  signed: boolean;
  account: Account;
  session: Session;
};

export type AuthContextProps = {
  signed: boolean;
  account: Account;
  signIn(signIn: SignIn): void;
  signOut(): void;
  refreshTokenIfExpiredAndDoRequests(...args: Function[]): Promise<void>;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const MINUTES_TO_CHECK_EXPIRATION_BEFORE = 5;

  const isUserSigned = () => {
    const { token } = cookieManager.getCookies();
    return (token && token !== '') as boolean
  }

  const [data, setData] = useState<AuthState>(() => {
    return {
      signed: isUserSigned(),
      account: localStorageManager.getUserAccount(),
      session: localStorageManager.getUserSession(),
    };
  });

  const isSessionExpired = (expirationDate: Date): boolean => {
    const currentDatetime = new Date(dayjs().add(MINUTES_TO_CHECK_EXPIRATION_BEFORE, "minutes").utc().format());
    const expireAt = dayjs(expirationDate).toDate();

    return currentDatetime >= expireAt;
  }

  const handleGetNewSessionResponse = (response: any) => {
    if (!response) {
      throw new TokenRefreshError();
    }

    return response;
  }

  const isConnectionRefused = (error: any) => {
    return !error.response;
  }

  const handleGetNewSessionError = (error: any) => {
    if (isConnectionRefused(error)) {
      throw new ConnectionRefusedError();
    } else {
      throw new TokenRefreshError();
    }
  }

  const getNewSession = async () => {
    return await refreshToken()
      .then(response => handleGetNewSessionResponse(response))
      .catch(error => handleGetNewSessionError(error));
  }

  const getNewTokenAndSetNewSessionToLocalstorage = async () => {
    const newSession = await getNewSession();
    localStorageManager.setUserSession(newSession);
  }

  const getRequestCallFunctionsWrappedIntoPromises = (requestCallFunctions: Function[]): Promise<void>[] => {
    return requestCallFunctions.map(requestFunction => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          await requestFunction();
          resolve();
        } catch (error) {
          console.log(error);
          reject(error);
        }
      });
    });
  }

  const handleRefreshTokenError = (error: any) => {
    if (error instanceof ConnectionRefusedError) {
      toast.error(error.message);
    } else {
      signOut();
      history.push("/");
    }
  }

  const handleDoRequestsError = (error: any) => {
    if (isConnectionRefused(error)) {
      throw new ConnectionRefusedError();
    }
  }

  const doRequests = async (promises: Promise<void>[]) => {
    return await Promise.all(promises)
      .catch(error => handleDoRequestsError(error));
  }

  const refreshTokenIfExpiredAndDoRequests = useCallback(async (...args: Function[]) => {
    try {
      const session = localStorageManager.getUserSession();

      if (isSessionExpired(session.expiresAt)) {
        await getNewTokenAndSetNewSessionToLocalstorage();
      }

      const requests = getRequestCallFunctionsWrappedIntoPromises(args);

      await doRequests(requests);
    } catch (error) {
      handleRefreshTokenError(error);
      return Promise.reject(error);
    }
  }, []);

  const signIn = useCallback((signIn: SignIn) => {

    const { account, session } = signIn;

    localStorageManager.setUserAccount(account);
    localStorageManager.setUserSession(session);

    setData({ signed: true, account, session });

  }, []);

  const signOut = useCallback(() => {

    localStorageManager.removeUserAccount();
    localStorageManager.removeUserSession();

    setData({} as AuthState);

  }, []);

  const value = React.useMemo(
    () => ({
      signed: data.signed,
      account: data.account,
      signIn,
      signOut,
      refreshTokenIfExpiredAndDoRequests
    }),
    [data, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }

  return context;
};

export default useAuth;
