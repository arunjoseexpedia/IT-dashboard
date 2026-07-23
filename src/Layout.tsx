import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
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

  const handleThemeToggle = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    window.dispatchEvent(new Event('themeChange'));
  };
  
  const tabNames = [t('generalTab'), t('slaTab'), t('e2eTab')];

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event, newValue );
    setTabValue(newValue);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: '60px', flexShrink: 0, zIndex: 50 }}>
        <Topbar currentTab={tabNames[tabValue]} />
      </header>

      {/* Main Content Area with Sidebar - Below Topbar */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', zIndex: 40 }}>
        {/* Left Sidebar */}
        <Sidebar isDarkTheme={isDarkTheme} onThemeToggle={handleThemeToggle} />

        {/* Right Content Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Tab Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', backgroundColor: isDarkTheme ? '#111827' : '#FFFFFF', flexShrink: 0 }}>
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
          <Box sx={{ flex: 1, overflow: 'auto', backgroundColor: isDarkTheme ? '#1a1f2e' : '#f4fafd' }}>
            {tabValue === 0 && <AribaReport />}
            {tabValue === 1 && <SLAEventReport /> }
            {tabValue === 2 && <ICertisReport />}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default Layout;
