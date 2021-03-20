import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';

import { Session, UserAccount, SignIn } from '../models';
import localStorageManager from '../utils/LocalStorageManager';

export type AuthState = {
  userAccount: UserAccount;
  session: Session;
};

export type AuthContextProps = {
  userAccount: UserAccount;
  signIn(signIn: SignIn): void;
  signOut(): void;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {

  const [data, setData] = useState<AuthState>(() => {
    return {
      userAccount: localStorageManager.getUserAccount(),
      session: localStorageManager.getUserSession(),
    };
  });

  const signIn = useCallback((signIn: SignIn) => {

    const { userAccount, session } = signIn;

    localStorageManager.setUserAccount(userAccount);
    localStorageManager.setUserSession(session);

    setData({ userAccount, session });

  }, []);

  const signOut = useCallback(() => {

    localStorageManager.removeUserAccount();
    localStorageManager.removeUserSession();

    setData({} as AuthState);

  }, []);

  const value = React.useMemo(
    () => ({
      userAccount: data.userAccount,
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
