import React from 'react';

export default function Button({ children, ...props }) {
  return (
    <button
      style={{
        padding: '0.5rem 1rem',
        background: '#0d6efd',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}
      {...props}
    >
      {children}
    </button>
  );
}
