import React from 'react';

import Routes from './routes';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import * as themes from './styles/themes';
import useAppTheme from './contexts/theme';
import { AuthProvider } from './contexts/auth';

const App: React.FC = () => {

  const { currentTheme } = useAppTheme();

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <AuthProvider>
        <GlobalStyle />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
