// src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './theme';            // Aşağıda tema dosyasını görüyorsun
import Home from './pages/Home';
import About from './pages/About';
import Info from './pages/Info';
import Sidebar from './components/Sidebar';
 
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={{
        'h1, h2, h3, h4, h5, h6, p': {
          margin: 0,
          padding: 0
        }
      }} />

      <BrowserRouter>
        <div style={{
          display: 'flex',
          height: '100vh',
          flexDirection: 'column'
        }}>
          <Sidebar />
          <div style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#f5f5f5'
          }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
createRoot(container).render(<App />);
