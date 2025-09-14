import React from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const Topbar = () => {
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
      <div className="topbarText" style={{ fontWeight: 'bold' }}>SAP Dashboard</div>

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
