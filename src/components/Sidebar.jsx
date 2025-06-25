import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

const menuStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '200px',
  height: '100%',
  background: '#202020',
  color: '#fff',
  paddingTop: '60px',
  boxSizing: 'border-box',
  transition: 'transform 0.3s ease-in-out'
};

export default function Sidebar({ open, onClose }) {
  return (
    <div
      style={{
        ...menuStyle,
        transform: open ? 'translateX(0)' : 'translateX(-100%)'
      }}
    >
      <div style={{ padding: '1rem' }}>
        <Link to="/" onClick={onClose}>Anasayfa</Link>
      </div>
      <div style={{ padding: '1rem' }}>
        <Link to="/about" onClick={onClose}>Hakkimizda</Link>
      </div>
      <div style={{ padding: '1rem' }}>
        <Link to="/info" onClick={onClose}>Bilgiler</Link>
      </div>
      <div style={{ padding: '1rem' }}>
        <Button onClick={onClose}>Kapat</Button>
      </div>
    </div>
  );
}
