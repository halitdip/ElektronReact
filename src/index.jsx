import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <div style={{
      display: 'flex',
      background : '#282c34',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '2rem'
    }}>
      Hello My Electron App
    </div>
  );
}

const container = document.getElementById('root');
createRoot(container).render(<App />);
