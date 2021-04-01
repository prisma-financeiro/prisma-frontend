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
import { Provider } from 'react-redux';
import store from './store';


const App: React.FC = () => {

  const { currentTheme } = useAppTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={themes[currentTheme]}>
        <AuthProvider>
          <Router history={history}>
            <Routes />
            <GlobalStyle />
          </Router>
          <ToastContainer />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
