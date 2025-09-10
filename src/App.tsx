import React from 'react';
import Topbar from './Topbar';
import AppRat from './AppRat';
import HalfCircleChart from './HalfCircleChart';
import AIIndex from './AIIndex';
import { VulnerabilitiesSection } from './VulnerabilitiesSection';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: '12%', borderRadius:'8px' }}>
        <Topbar />
      </header>

      {/* Body Content */}
      <div style={{ flex: 1, display: 'flex' }}>
        {/* Left Sidebar */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#dadada',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px', // space between columns
          }}
        >
          <div style={{ flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
          <h5><center>TechDebtReduction</center></h5>
          <div style={{ height: '100px', position: 'relative' }}>
          <HalfCircleChart percentage={75} />
          </div>
  
          </div>
          <div style={{ flex: 1,borderRadius:'8px', backgroundColor: 'white' }}>
          <h5 style={{ marginBottom: '0', padding: '2px', textAlign: 'center' }}><center>App Rat</center></h5>
          <AppRat />
          </div>
          <div style={{ flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
          <AIIndex/>
          </div>
        </div>

        {/* Middle/Main Content */}
        <div
          style={{
            flex: 3,
            backgroundColor: '#dadada',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
          }}
        >
          <div style={{ flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
          <VulnerabilitiesSection />
          </div>
          <div style={{ flex: 2,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
            
          </div>
          <div style={{ flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
            
          </div>
        </div>

        {/* Right Sidebar */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#dadada',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px',
          }}
        >
          <div style={{ flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
            
          </div>

          <div style={{ flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
