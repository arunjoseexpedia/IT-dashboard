import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Topbar from './Topbar';
import AribaReport from './pages/AribaReport';
import ICertisReport from './pages/ICertisReport';
import SLAEventReport from './pages/SLAEventReport';

function Layout() {
  const [tabValue, setTabValue] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    // Check initial theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    setIsDarkTheme(savedTheme === 'dark');
    
    // Listen for theme changes
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('theme');
      setIsDarkTheme(currentTheme === 'dark');
    };
    
    window.addEventListener('themeChange', handleThemeChange);
    return () => window.removeEventListener('themeChange', handleThemeChange);
  }, []);
  
  const tabNames = [t('generalTab'), t('slaTab'), t('e2eTab')];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event, newValue );
    setTabValue(newValue);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: '11%', borderRadius:'8px' }}>
        <Topbar currentTab={tabNames[tabValue]} />
      </header>

      {/* Tab Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: isDarkTheme ? '#111827' : '#F8FAFC' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '14px',
              fontWeight: 500,
              color: isDarkTheme ? '#9CA3AF' : '#666',
              outline: 'none',
              '&:focus': {
                outline: 'none',
              },
              '&.Mui-selected': {
                color: isDarkTheme ? '#FFFFFF' : '#02355a',
                fontWeight: 700,
              }
            }
          }}
        >
          <Tab label={t('generalTab')} />
          <Tab label={t('slaTab')} />
          <Tab label={t('e2eTab')} />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {tabValue === 0 && <AribaReport />}
        {tabValue === 1 && <SLAEventReport /> }
        {tabValue === 2 && <ICertisReport />}
      </Box>
    </div>
  );
}

export default Layout;
