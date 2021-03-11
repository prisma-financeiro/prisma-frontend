import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';
import { Session, UserAccount, SignIn } from '../models';

import cookieManager from '../services/cookieManager';
import { storageKey } from '../utils';

export type AuthState = {
  signed: boolean;
  userAccount: UserAccount;
  session: Session;
};

export type AuthContextProps = {
  signed: boolean;
  userAccount: UserAccount;
  signIn(signIn: SignIn): void;
  signOut(): void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [data, setData] = useState<AuthState>(() => {

    const { token } = cookieManager.getCookies();

    const userAccount = localStorage.getItem(storageKey('userAccount'));
    const session = localStorage.getItem(storageKey('session'));

    return {
      signed: (token && token !== '') as boolean,
      userAccount: userAccount ? JSON.parse(userAccount) : {},
      session: session ? JSON.parse(session) : {},
    };
  });

  const signIn = useCallback((signIn: SignIn) => {

    const { userAccount, session } = signIn;

    localStorage.setItem(storageKey('userAccount'), JSON.stringify(userAccount));
    localStorage.setItem(storageKey('session'), JSON.stringify(session));

    setData({ signed: true, userAccount, session });

  }, []);

  const signOut = useCallback(() => {

    localStorage.removeItem(storageKey('userAccount'));
    localStorage.removeItem(storageKey('session'));

    setData({} as AuthState);

  }, []);

  const value = React.useMemo(
    () => ({
      signed: data.signed,
      userAccount: data.userAccount,
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
