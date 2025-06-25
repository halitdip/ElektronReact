import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

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

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: 'rgba(0,0,0,0.3)'
};

function Page({ title, children }) {
  return (
    <div style={{ padding: '2rem', color: '#fff' }}>
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}

function App() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState('home');

  const menuItems = [
    { key: 'home', label: 'Anasayfa' },
    { key: 'about', label: 'Hakkımızda' },
    { key: 'info', label: 'Bilgiler' }
  ];

  const renderPage = () => {
    switch (page) {
      case 'about':
        return (
          <Page title="Hakkımızda">
            Bu sayfa masaüstü uygulaması hakkında bilgiler içerir.
          </Page>
        );
      case 'info':
        return (
          <Page title="Bilgiler">
            Buraya bazı bilgilendirici metinler eklenebilir.
          </Page>
        );
      default:
        return (
          <Page title="Anasayfa">
            Elektron ve React ile oluşturulmuş basit bir uygulama.
          </Page>
        );
    }
  };

  return (
    <div style={{
      display: 'flex',
      background: '#282c34',
      height: '100vh',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '1rem', color: '#fff' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          &#9776;
        </button>
      </div>
      {open && (
        <div style={overlayStyle} onClick={() => setOpen(false)} />
      )}
      <div
        style={{
          ...menuStyle,
          transform: open ? 'translateX(0)' : 'translateX(-100%)'
        }}
      >
        {menuItems.map(item => (
          <div
            key={item.key}
            onClick={() => {
              setPage(item.key);
              setOpen(false);
            }}
            style={{ padding: '1rem', cursor: 'pointer' }}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {renderPage()}
      </div>
    </div>
  );
}

const container = document.getElementById('root');
createRoot(container).render(<App />);
