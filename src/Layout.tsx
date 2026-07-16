import React, { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import Topbar from './Topbar';
import AribaReport from './pages/AribaReport';
import ICertisReport from './pages/ICertisReport';
import SLAEventReport from './pages/SLAEventReport';

function Layout() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: '11%', borderRadius:'8px' }}>
        <Topbar />
      </header>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: '#f5f5f5' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              color: '#666',
              outline: 'none',
              '&:focus': {
                outline: 'none',
              },
              '&.Mui-selected': {
                color: '#02355a',
                fontWeight: 700,
              }
            }
          }}
        >
          <Tab label="General" />
          <Tab label="SLA Draft" />
          <Tab label="E2E Template" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {tabValue === 0 && <AribaReport />}
        {tabValue === 1 && <ICertisReport />}
        {tabValue === 2 && <SLAEventReport />}
      </Box>
    </div>
  );
}

export default Layout;
