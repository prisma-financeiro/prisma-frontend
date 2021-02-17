import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';
import { Session, Account, SignIn } from '../models';

import cookieManager from '../services/cookieManager';
import { storageKey } from '../utils';

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

    const account = localStorage.getItem(storageKey('account'));
    const session = localStorage.getItem(storageKey('session'));

    return {
      signed: (token && token !== '') as boolean,
      account: account ? JSON.parse(account) : {},
      session: session ? JSON.parse(session) : {},
    };
  });

  const signIn = useCallback((signIn: SignIn) => {

    const { account, session } = signIn;

    localStorage.setItem(storageKey('account'), JSON.stringify(account));
    localStorage.setItem(storageKey('session'), JSON.stringify(session));

    setData({ signed: true, account, session });

  }, []);

  const signOut = useCallback(() => {

    localStorage.removeItem(storageKey('account'));
    localStorage.removeItem(storageKey('session'));

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
