import React from 'react';
import Topbar from './Topbar';
import { Typography } from '@mui/material';
import {ProductRoadMap} from './ProductRoadMap';
import AppRat from './AppRat';
import HalfCircleChart from './HalfCircleChart';
import ThreeValueTable from './ThreeValueTable';
import AIIndex from './AIIndex';
import {ExpensiveSqlOptimazation} from './ExpensiveSqlOptimazation';
import ThreeValueBarChart from './ThreeValueBarChart';
import { VulnerabilitiesSection } from './VulnerabilitiesSection';
import { Outlet } from 'react-router-dom';

function Layout() {
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
            backgroundColor: '#3A4862',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '9px', // space between columns
          }}
        >
          <div style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
          <h6><center><Typography
  sx={{
    fontWeight: 'bold',
    fontSize: '15px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#0033a0',
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  }}>Tech Debt Reduction</Typography></center></h6>
          <div style={{ height: '100px', position: 'relative' }}>
          <HalfCircleChart  />
          </div>
  
          </div>
          <div style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white' }}>
          <h5 style={{ marginBottom: '0', padding: '2px', textAlign: 'center' }}><center><Typography
  sx={{
    fontWeight: 'bold',
    fontSize: '15px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#0033a0',
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  }}>App Rat</Typography></center></h5>
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
            backgroundColor: '#3A4862',
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
            backgroundColor: '#3A4862',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div style={{ boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '6px' }}>
          <h6 style={{ textAlign: 'center' }}><Typography
  sx={{
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#0033a0',
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  }}>Operation Metrics</Typography></h6>
          <ThreeValueBarChart labels={['RICEFS', 'FloriApps', 'Retrofits','Live Compare (Exceutions)']}
        values={[4000, 2000, 7000,8000]}
        />
          </div>

          <div style={{boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)', flex: 1,borderRadius:'8px', backgroundColor: 'white', padding: '8px' }}>
          <h6 style={{ textAlign: 'center' }}><Typography
  sx={{
    fontWeight: 'bold',
    fontSize: '14px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#0033a0',
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  }}>Service Now Request</Typography></h6>
          <ThreeValueTable
       
      /> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
