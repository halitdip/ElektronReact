import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Button from './components/Button';

import Home from './pages/Home';
import About from './pages/About';
import Info from './pages/Info';
import Sidebar from './components/Sidebar';

function App() {
  const [open, setOpen] = useState(false);

  return (
    <BrowserRouter>
      <div style={{
        display: 'flex',
        background: '#282c34',
        height: '100vh',
        flexDirection: 'column'
      }}>
        <div style={{ padding: '1rem', color: '#fff' }}>
          <Button onClick={() => setOpen(!open)}>&#9776;</Button>
        </div>
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <div style={{ flex: 1, overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
createRoot(container).render(<App />);
