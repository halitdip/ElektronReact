// src/App.tsx
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { getTheme } from './theme/theme';
import Home from './features/Home';
import Login from './features/Login';
import Sidebar from './components/Sidebar';
import LoadingOverlay from './components/LoadingOverlay';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

export const ColorModeContext = React.createContext({
  mode: 'dark',
  toggleColorMode: () => { },
});

export default function App() {
  const { isAuthenticated, loading } = useContext(AuthContext); 
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    setMode('dark');
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode(prev => (prev === 'light' ? 'dark' : 'light'));
      },
    }),
    [mode]
  );

  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles styles={{
          html: { height: '100%' },
          body: {
            margin: 0,
            padding: 0,
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
          },
          '#root': { height: '100%', width: '100%' },
        }} />
        <LoadingOverlay open={loading} />
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            {isAuthenticated && <Sidebar />}
            <Routes>
              {isAuthenticated ? (
                <>
                  <Route path="/*" element={<Home />} />
                  <Route path="*" element={<Navigate to="/" />} />
                </>
              ) : (
                <>
                  <Route path="/login" element={<Login />} />
                  <Route path="*" element={<Navigate to="/login" />} />
                </>
              )}
            </Routes>
          </div>
        </HashRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
