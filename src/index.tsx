import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { LogProvider } from './context/LogContext';

const container = document.getElementById('root');
createRoot(container).render(
  <LogProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </LogProvider>
);
