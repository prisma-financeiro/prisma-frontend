import React from 'react';
import { Router } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';
import * as themes from './styles/themes';
import useAppTheme from './contexts/theme';
import { AuthProvider } from './contexts/auth';
import history from './services/history';
import Routes from './routes';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {

  const { currentTheme } = useAppTheme();

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <AuthProvider>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
        </Router>
        <ToastContainer />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
