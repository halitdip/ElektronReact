// src/App.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';
import { CssBaseline, GlobalStyles } from '@mui/material'; 
import { getTheme } from './theme/theme';
import Home from './features/Home';
import Login from './features/Login';
import Sidebar from './components/Sidebar';
import LoadingOverlay from './components/LoadingOverlay';
import { HashRouter, Routes, Route } from 'react-router-dom';

const STORAGE_KEY = 'mui_app_theme';

export const ColorModeContext = React.createContext({
  mode: 'dark',
  toggleColorMode: () => {},
});

export default function App() {
  const isLogin = true;
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode(prev => {
          const newMode = prev === 'light' ? 'dark' : 'light';
          localStorage.setItem(STORAGE_KEY, newMode);
          return newMode;
        });
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
        <HashRouter>
          <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
            <Sidebar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </HashRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
