import { useEffect, useState } from "react"; 
import { Box, IconButton, Typography, Badge, Tooltip } from "@mui/material"; 
import { Notifications, HelpOutline } from "@mui/icons-material";
import { useTranslation } from 'react-i18next';
import ChatBot from './components/ChatBot';


const Topbar = ({ currentTab = 'General' }: { currentTab?: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
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

      {/* Right side - Notifications, Chatbot, and Menu Icons */}
      <Box display="flex" alignItems="center" gap={1}>
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
                color: 'white', 
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

        {/* Chatbot Icon */}
        <Tooltip title="Chat with Assistant">
          <IconButton 
            onClick={() => setChatOpen(true)}
            sx={{ 
              color: 'white', 
              padding: '8px',
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }, 
              '&:active': { backgroundColor: 'rgba(255,255,255,0.2)' }, 
              '& .MuiTouchRipple-root': { display: 'none' } 
            }}
          >
            <HelpOutline sx={{ fontSize: 28 }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* ChatBot Modal */}
      <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Topbar;
