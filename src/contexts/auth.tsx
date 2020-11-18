import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  PropsWithChildren,
} from 'react';

import { storageKey } from '../utils';

export type AuthState = {
  signed: boolean;
  account: null;
};

export type AuthContext = {
  signed: boolean;
  account: any;
  signIn(name: string): void;
  signOut(): void;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [data, setData] = useState<AuthState>(() => {
    const storedUser = localStorage.getItem(storageKey('user'));

    if (storedUser) {
      const userName = JSON.parse(storedUser);

      return {
        signed: true,
        account: null,
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback((name) => {
    localStorage.setItem(storageKey('user'), JSON.stringify(name));
    setData({ signed: true, account: null });
  }, []);

  const signOut = useCallback(() => {
    setData({} as AuthState);
    localStorage.removeItem(storageKey('user'));
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

const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(`useAuth must be used within an AuthProvider`);
  }

  return context;
};

export default useAuth;
