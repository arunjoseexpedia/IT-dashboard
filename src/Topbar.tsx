import React from 'react';

const Topbar = () => {
  return (
    <div
      style={{
        backgroundColor: '#0033A0',
        color: 'white',
        height: '100%',
        padding: '5px 15px',
        fontSize: '0.9rem',
        display: 'flex',
        border: '1px solid #ccc',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left side - contact info */}
      <div>IT Dash Board</div>

      {/* Right side - social icons or links */}
      <div style={{ display: 'flex', gap: '15px' }}>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Twitter
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Facebook
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default Topbar;
