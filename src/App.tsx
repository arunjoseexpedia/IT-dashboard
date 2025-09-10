import React from 'react';
import Topbar from './Topbar';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: '10%' }}>
        <Topbar />
      </header>

      {/* Body Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left Sidebar */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f4f4f4',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px', // space between columns
          }}
        >
          <div style={{ flex: 1, backgroundColor: '#ccc', padding: '8px' }}>
            <p>Column 1</p>
          </div>
          <div style={{ flex: 1, backgroundColor: '#bbb', padding: '8px' }}>
            <p>Column 2</p>
          </div>
          <div style={{ flex: 1, backgroundColor: '#aaa', padding: '8px' }}>
            <p>Column 3</p>
          </div>
        </div>

        {/* Middle/Main Content */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f4f4f4',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ flex: 1, backgroundColor: '#ccc', padding: '8px' }}>
            <p>Column 1</p>
          </div>
          <div style={{ flex: 1.5, backgroundColor: '#bbb', padding: '8px' }}>
            <p>Column 2</p>
          </div>
          <div style={{ flex: 1, backgroundColor: '#aaa', padding: '8px' }}>
            <p>Column 3</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f4f4f4',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <div style={{ flex: 1, backgroundColor: '#ccc', padding: '8px' }}>
            <p>Column 1</p>
          </div>

          <div style={{ flex: 1, backgroundColor: '#aaa', padding: '8px' }}>
            <p>Column 3</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
