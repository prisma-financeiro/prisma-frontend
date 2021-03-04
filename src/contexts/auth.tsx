import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';

import { Session, Account, SignIn } from '../models';
import cookieManager from '../services/cookieManager';
import storageManager from '../utils/storage';

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
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [data, setData] = useState<AuthState>(() => {

    const { token } = cookieManager.getCookies();

    return {
      signed: (token && token !== '') as boolean,
      account: storageManager.getUserAccount(),
      session: storageManager.getUserSession(),
    };
  });

  const signIn = useCallback((signIn: SignIn) => {

    const { account, session } = signIn;

    storageManager.setUserAccount(account);
    storageManager.setUserSession(session);

    setData({ signed: true, account, session });

  }, []);

  const signOut = useCallback(() => {

    storageManager.removeUserAccount();
    storageManager.removeUserSession();

    setData({} as AuthState);

  }, []);

  const value = React.useMemo(
    () => ({
      signed: data.signed,
      account: data.account,
      signIn,
      signOut,
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
