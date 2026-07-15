import React from 'react';
import Topbar from './Topbar';

function Layout() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: '10%', borderRadius:'8px' }}>
        <Topbar />
      </header>

     
    </div>
  );
}

export default Layout;
