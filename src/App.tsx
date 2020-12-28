import React from 'react';
import { Router } from 'react-router-dom';

import Routes from './routes';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import * as themes from './styles/themes';
import useAppTheme from './contexts/theme';
import { AuthProvider } from './contexts/auth';
import Footer from './components/Footer';
import Header from './components/Header';
import history from './services/history';

const App: React.FC = () => {

  const { currentTheme } = useAppTheme();

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <AuthProvider>
        <GlobalStyle />
        <Header />
        <Router history={history}>
          <Routes />
        </Router>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
