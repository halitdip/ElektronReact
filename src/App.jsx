import React, { useState, useEffect, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorBoundary from './components/ErrorBoundary';

import { getTheme } from './theme';

import Home from './features/Home/';
import Login from './features/Login/';

import { registerLoadingSetter } from './services/extension/loadingService';

export const ColorModeContext = React.createContext({
  mode: 'dark',
  toggleColorMode: () => {},
});

export default function App() {
  const isLogin = true;
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    registerLoadingSetter(setLoading);
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <LoadingOverlay open={loading} />
        <GlobalStyles
          styles={(theme) => ({
            'h1, h2, h3, h4, h5, h6, p': {
              margin: 0,
              padding: 0,
            },
            html: {
              height: '100%',
            },
            body: {
              height: '100%',
              width: '100%',
              overflow: 'hidden',
              margin: 0,
              padding: 0,
              backgroundColor: theme.palette.background.default,
              color: theme.palette.text.primary,
            },
            '#root': {
              height: '100%',
              width: '100%',
            },
          })}
        />
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          {isLogin ? (
            <div
              style={{
                display: 'flex',
                overflow: 'hidden',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Sidebar />
              <Routes>
                <Route
                  path="/"
                  element={
                    <ErrorBoundary>
                      <Home />
                    </ErrorBoundary>
                  }
                />
              </Routes>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          )}
        </HashRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
