import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';

import { Session, Account, SignIn } from '../models';
import localStorageManager from '../utils/LocalStorageManager';

export type AuthState = {
  account: Account;
  session: Session;
};

export type AuthContextProps = {
  account: Account;
  signIn(signIn: SignIn): void;
  signOut(): void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {

  const [data, setData] = useState<AuthState>(() => {
    return {
      account: localStorageManager.getUserAccount(),
      session: localStorageManager.getUserSession(),
    };
  });

  const signIn = useCallback((signIn: SignIn) => {

    const { account, session } = signIn;

    localStorageManager.setUserAccount(account);
    localStorageManager.setUserSession(session);

    setData({ account, session });

  }, []);

  const signOut = useCallback(() => {

    localStorageManager.removeUserAccount();
    localStorageManager.removeUserSession();

    setData({} as AuthState);

  }, []);

  const value = React.useMemo(
    () => ({
      account: data.account,
      signIn,
      signOut
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
