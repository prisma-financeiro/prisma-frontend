import React from 'react';

import Routes from './routes';

import { darkTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './styles/global';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
