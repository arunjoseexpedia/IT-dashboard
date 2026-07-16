import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip, Typography, Drawer } from "@mui/material";
import { DarkMode, LightMode, Close } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';


const Topbar = ({ currentTab = 'General' }: { currentTab?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Trigger the animation after component mounts
    setLoaded(true);
  }, []);

  useEffect(() => {
    // Apply theme to document background
    if (isDarkTheme) {
      document.body.style.backgroundColor = '#0d1117';
      document.body.style.color = '#ffffff';
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    }
  }, [isDarkTheme]);
  return (
    <div
      style={{
        backgroundColor: '#02355a',
        color: 'white',
        height: '60px',
        padding: '5px 15px',
        fontSize: '0.9rem',
        display: 'flex',
        border: '1px solid #ccc',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left side - Logo */}
      <Box
        component="img"
        src="pepsico-logo.jpg"
        alt="PepsiCo Logo"
        sx={{ height: 50, objectFit: 'contain', marginRight: '15px' }}
      />

      {/* Center - Title */}
      <div className="topbarText" style={{ fontWeight: 'bold', flex: 1, textAlign: 'left' }}>
        <Typography sx={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-.01em', color: '#fff', '&:hover': {
          color:'white',
          cursor:'pointer'
        }}}>
          <b>  {t('dashboard')} {currentTab} </b>
        </Typography>
      </div>

      {/* Right side - Menu Toggle Button */}
      <Box display="flex" alignItems="center" gap={2}>
       
          <IconButton sx={{ color: 'white', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { backgroundColor: 'transparent' }, '&:active': { backgroundColor: 'transparent' }, '& .MuiTouchRipple-root': { display: 'none' } }} onFocus={(e) => (e.currentTarget.style.outline = "none")} onClick={() => setMenuOpen(true)}>
            <Box
              component="img"
              src="MenuIcon.png"
              alt="Menu Icon"
              sx={{ width: 70, height: 50, cursor: 'pointer', display: 'block' }}
            />
          </IconButton>
        
      </Box>

      {/* Sliding Menu Drawer */}
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      >
        <Box
          sx={{
            width: 300,
            padding: '20px',
            backgroundColor: '#f5f5f5',
            height: '100%',
          }}
        >
          {/* Close Button */}
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#666' }}>
              {t('menu')}
            </Typography>
            <IconButton size="small" onClick={() => setMenuOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <Box sx={{ borderBottom: '1px solid #ddd', mb: 2 }} />

          {/* Appearance Section */}
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#999', mb: 2 }}>
            {t('appearance')}
          </Typography>

          <Box
            onClick={() => setIsDarkTheme(!isDarkTheme)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              padding: '10px',
              cursor: 'pointer',
              borderRadius: '4px',
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            {isDarkTheme ? (
              <LightMode sx={{ fontSize: 30, color: '#f0ad4e' }} />
            ) : (
              <DarkMode sx={{ fontSize: 30, color: '#5c6ac4' }} />
            )}
            <Typography sx={{ color: '#666', fontWeight: 500 }}>
              {isDarkTheme ? t('switchToLightTheme') : t('switchToDarkTheme')}
            </Typography>
          </Box>

          <Box sx={{ borderBottom: '1px solid #ddd', my: 2 }} />

          {/* Additional Menu Items */}
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#999', mb: 2 }}>
            {t('data')}
          </Typography>

          <Box sx={{ borderBottom: '1px solid #ddd', my: 2 }} />

          {/* Language Section */}
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#999', mb: 2 }}>
            {t('language')}
          </Typography>

          {/* English Button */}
          <Box
            onClick={() => i18n.changeLanguage('en')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: '10px',
              cursor: 'pointer',
              borderRadius: '4px',
              backgroundColor: i18n.language === 'en' ? '#e3f2fd' : 'transparent',
              fontWeight: i18n.language === 'en' ? 600 : 500,
              color: i18n.language === 'en' ? '#02355a' : '#666',
              marginBottom: '8px',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            <Typography sx={{ color: 'inherit', fontWeight: 'inherit' }}>
              {t('english')}
            </Typography>
          </Box>

          {/* Spanish Button */}
          <Box
            onClick={() => i18n.changeLanguage('es')}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              padding: '10px',
              cursor: 'pointer',
              borderRadius: '4px',
              backgroundColor: i18n.language === 'es' ? '#e3f2fd' : 'transparent',
              fontWeight: i18n.language === 'es' ? 600 : 500,
              color: i18n.language === 'es' ? '#02355a' : '#666',
              '&:hover': { backgroundColor: '#f0f0f0' },
            }}
          >
            <Typography sx={{ color: 'inherit', fontWeight: 'inherit' }}>
              {t('spanish')}
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </div>
  );
};

export default Topbar;
