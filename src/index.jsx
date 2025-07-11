// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';
import Home from './pages/Home';
import About from './pages/About';
import Info from './pages/Info';
import Login from './pages/auth/login';
import Sidebar from './components/Sidebar';
import LoadingOverlay from './components/LoadingOverlay';
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
            <div style={{
              flex: 1,
              padding: 10,
              backgroundColor: '#f5f5f5',
              overflow:'hidden',
              height: '100%'
            }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/info" element={<Info />} />
              </Routes>
            </div>
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

