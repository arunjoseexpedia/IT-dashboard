import React, { useEffect, useState } from "react";
import { Box, IconButton, Tooltip,Typography } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const Topbar = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    // Trigger the animation after component mounts
    setLoaded(true);
  }, []);
  return (
    <div
      style={{
        backgroundColor: '#0033A0',
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
      {/* Left side - Title */}
      <div className="topbarText" style={{ fontWeight: 'bold',top: '20px',
        left: loaded ? '20px' : '50%',
        transform: loaded ? 'translateX(0)' : 'translateX(-50%)',
        transition: 'all 0.8s ease-in-out' }}><Typography sx={{ '&:hover': {
          color:'white',
          cursor:'pointer'
        }}}>SAP Dashboard</Typography></div>

      {/* Right side - Toggle + Logo */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Theme Toggle Button */}
        <Tooltip title="Toggle Theme">
          <IconButton  sx={{ color: 'white' }}>
              <LightMode />
          </IconButton>
        </Tooltip>

        {/* Logo */}
        <Box
          component="img"
          src="pepsico-logo.jpg"
          alt="PepsiCo Logo"
          sx={{ height: 40, objectFit: 'contain' }}
        />
      </Box>
    </div>
  );
};

export default Topbar;
