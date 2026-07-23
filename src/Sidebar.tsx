import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Drawer, Tooltip } from '@mui/material';
import { Close, DarkMode, LightMode } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface MenuItem {
  label: string;
  onClick: () => void;
  icon?: React.ReactNode;
  color?: string;
  isActive?: boolean;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

interface SidebarProps {
  isDarkTheme: boolean;
  onThemeToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isDarkTheme, onThemeToggle }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuSections: MenuSection[] = [
    {
      title: t('appearance'),
      items: [
        {
          label: isDarkTheme ? t('switchToLightTheme') : t('switchToDarkTheme'),
          icon: isDarkTheme ? <LightMode sx={{ fontSize: 24 }} /> : <DarkMode sx={{ fontSize: 24 }} />,
          onClick: onThemeToggle,
          color: isDarkTheme ? '#f0ad4e' : '#5c6ac4',
        },
      ],
    },
    {
      title: t('language'),
      items: [
        {
          label: t('english'),
          onClick: () => i18n.changeLanguage('en'),
          isActive: i18n.language === 'en',
        },
        {
          label: t('spanish'),
          onClick: () => i18n.changeLanguage('es'),
          isActive: i18n.language === 'es',
        },
      ],
    },
  ];

  const sidebarWidth = isCollapsed ? '70px' : '280px';
  const sidebarBgColor = isDarkTheme ? '#1a1f2e' : '#FFFFFF';
  const textColor = isDarkTheme ? '#FFFFFF' : '#1F2937';
  const borderColor = isDarkTheme ? '#2d3748' : '#E5E7EB';
  const hoverBgColor = isDarkTheme ? '#2d3748' : '#F3F4F6';

  const sidebarContent = (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        backgroundColor: sidebarBgColor,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          padding: isCollapsed ? '12px 8px' : '16px 20px',
          borderBottom: `1px solid ${borderColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        {!isCollapsed && (
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#02355a',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {t('menu')}
          </Typography>
        )}
        <Tooltip title={isCollapsed ? t('expand') || 'Expand' : t('collapse') || 'Collapse'}>
          <IconButton
            size="small"
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{
              color: '#02355a',
              marginLeft: 'auto',
              padding: '4px',
              '&:hover': { backgroundColor: 'rgba(2, 53, 90, 0.08)' },
            }}
          >
            {isCollapsed ? (
              <ChevronRight sx={{ fontSize: 20 }} />
            ) : (
              <ChevronLeft sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          padding: isCollapsed ? '8px 4px' : '16px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {menuSections.map((section, idx) => (
          <Box key={idx}>
            {!isCollapsed && (
              <Typography
                sx={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#999',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px',
                  paddingLeft: '8px',
                }}
              >
                {section.title}
              </Typography>
            )}

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {section.items.map((item, itemIdx) => (
                <Tooltip
                  key={itemIdx}
                  title={isCollapsed ? item.label : ''}
                  placement="right"
                >
                  <Box
                    onClick={item.onClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: isCollapsed ? '0' : '12px',
                      padding: isCollapsed ? '8px 4px' : '10px 8px',
                      cursor: 'pointer',
                      borderRadius: '6px',
                      backgroundColor: item.isActive
                        ? isDarkTheme
                          ? 'rgba(2, 53, 90, 0.2)'
                          : '#E3F2FD'
                        : 'transparent',
                      color: item.isActive ? '#02355a' : textColor,
                      fontWeight: item.isActive ? 600 : 500,
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: hoverBgColor,
                        color: '#02355a',
                      },
                      justifyContent: isCollapsed ? 'center' : 'flex-start',
                    }}
                  >
                    {item.icon && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: item.color || 'inherit',
                          minWidth: '24px',
                        }}
                      >
                        {item.icon}
                      </Box>
                    )}
                    {!isCollapsed && (
                      <Typography
                        sx={{
                          fontSize: '13px',
                          color: 'inherit',
                          fontWeight: 'inherit',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {item.label}
                      </Typography>
                    )}
                  </Box>
                </Tooltip>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          padding: isCollapsed ? '8px 4px' : '12px 12px',
          borderTop: `1px solid ${borderColor}`,
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: '10px',
            color: '#999',
            textAlign: isCollapsed ? 'center' : 'left',
            letterSpacing: '0.02em',
          }}
        >
          {isCollapsed ? 'v1.0' : 'Dashboard v1.0'}
        </Typography>
      </Box>
    </Box>
  );

  // Desktop sidebar (permanent)
  if (!isMobileView) {
    return (
      <Box
        sx={{
          width: sidebarWidth,
          height: '100%',
          transition: 'width 0.3s ease',
          boxShadow: '2px 0 8px rgba(0,0,0,0.08)',
          zIndex: 100,
          flexShrink: 0,
        }}
      >
        {sidebarContent}
      </Box>
    );
  }

  // Mobile drawer
  return (
    <Drawer
      anchor="left"
      open={isMobileOpen}
      onClose={() => setIsMobileOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: sidebarBgColor,
        },
      }}
    >
      <Box sx={{ width: 280 }}>
        <Box
          sx={{
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${borderColor}`,
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: 700,
              color: '#02355a',
            }}
          >
            {t('menu')}
          </Typography>
          <IconButton size="small" onClick={() => setIsMobileOpen(false)}>
            <Close />
          </IconButton>
        </Box>
        <Box sx={{ padding: '16px 12px' }}>
          {sidebarContent}
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
