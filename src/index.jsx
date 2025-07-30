// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './components/Sidebar';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorBoundary from './components/ErrorBoundary';

import theme from './theme';

import Home from './features/Home/';
import Login from './features/Login/';

import { useState, useEffect } from 'react';
import { registerLoadingSetter } from './services/extension/loadingService';

function App() {
  const isLogin = true;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    registerLoadingSetter(setLoading);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingOverlay open={loading} />

      <GlobalStyles styles={{
        'h1, h2, h3, h4, h5, h6, p': {
          margin: 0,
          padding: 0,
        },
        'html, body, #root': {
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          margin: 0,
          padding: 0
        },
      }} />

      <HashRouter future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}>
        {isLogin ? (
          <div style={{
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column',
            height: '100%'
          }}>
            <Sidebar />
            <Routes>
              <Route path="/" element={
                <ErrorBoundary>
                  <Home />
                </ErrorBoundary>
              } />
            </Routes>

          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
          </Routes>
        )}
      </HashRouter>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
createRoot(container).render(<App />);

