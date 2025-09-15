import React from 'react';
import Topbar from './Topbar';
import {ProductRoadMap} from './ProductRoadMap';
import AppRat from './AppRat';
import HalfCircleChart from './HalfCircleChart';
import ThreeValueTable from './ThreeValueTable';
import AIIndex from './AIIndex';
import {ExpensiveSqlOptimazation} from './ExpensiveSqlOptimazation';
import ThreeValueBarChart from './ThreeValueBarChart';
import { VulnerabilitiesSection } from './VulnerabilitiesSection';

function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: '10%', borderRadius:'8px' }}>
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
          <div style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
          <h5><center>Tech Debt Reduction</center></h5>
          <div style={{ height: '100px', position: 'relative' }}>
          <HalfCircleChart  />
          </div>
  
          </div>
          <div style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white' }}>
          <h5 style={{ marginBottom: '0', padding: '2px', textAlign: 'center' }}><center>App Rat</center></h5>
          <AppRat />
          </div>
          <div style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
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
          <div style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
          <VulnerabilitiesSection />
          </div>
          <div style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '7px' }}>
            <ExpensiveSqlOptimazation/>
          </div>
          <div style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
            <ProductRoadMap/>
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
            gap: '8px',
          }}
        >
          <div style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '6px' }}>
          <ThreeValueBarChart labels={['RICEFS', 'FloriApps', 'Retrofits','Live Compare (Exceutions)']}
        values={[4000, 2000, 7000,8000]}
        />
          </div>

          <div style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
          <h4 style={{ textAlign: 'center' }}>Service Now Request</h4>
          <ThreeValueTable
        data={[
          { label: 'Processed', value: 9873 },
          { label: 'In Progress', value: 98 },
          { label: '% Completed', value: 58 },
        ]}
      /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
