import React from 'react';

export default function CenterContent({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem',
      }}
    >
      {children}
    </div>
  );
}
