import { useEffect, useState } from "react"; 
import { Box, IconButton, Typography, Badge, Tooltip } from "@mui/material"; 
import { Notifications } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';


const Topbar = ({ currentTab = 'General' }: { currentTab?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const unreadCount = 7; // Unread notifications count
  const { t } = useTranslation();
  
  useEffect(() => {
    console.log('Topbar component mounted',loaded);
    // Trigger the animation after component mounts
    setLoaded(true);
  }, []);
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
          <b>  {currentTab} {t('dashboard')}  </b>
        </Typography>
      </div>

      {/* Right side - Notifications and User Avatar */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Notifications Icon with Badge */}
        <Tooltip title="Notifications">
          <Badge 
            badgeContent={unreadCount} 
            color="error"
            sx={{
              position: 'relative',
              display: 'inline-flex',
              '& .MuiBadge-badge': {
                right: '9px',
                top: '9px',
                border: `2px solid #02355a`,
                padding: '0 4px',
                fontWeight: 700,
                fontSize: '11px',
                minWidth: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ef4444',
                zIndex: 1,
              },
            }}
          >
            <IconButton 
              sx={{ 
                color: '#FFF8E1', 
                padding: '8px',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, 
                '&:active': { backgroundColor: 'rgba(255,255,255,0.2)' }, 
                '& .MuiTouchRipple-root': { display: 'none' } 
              }}
            >
              <Notifications sx={{ fontSize: 28 }} />
            </IconButton>
          </Badge>
        </Tooltip>

        {/* User Avatar and Info */}
        <Box display="flex" alignItems="center" gap="10px" sx={{ paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>
          {/* Avatar Circle */}
          <Box
            sx={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4F46E5 0%, #6D28D9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              fontWeight: 700,
              color: 'white',
              flexShrink: 0,
            }}
          >
            JD
          </Box>

          {/* User Info */}
          <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '0' }}>
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 600,
                color: 'white',
                lineHeight: 1.2,
              }}
            >
              John Doe
            </Typography>
            <Typography
              sx={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.7)',
                lineHeight: 1.2,
              }}
            >
              admin
            </Typography>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Topbar;
