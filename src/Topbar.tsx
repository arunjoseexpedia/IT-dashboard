import React from 'react';
import {
 Box,
} from '@mui/material';

const Topbar = () => {
  return (
    <div
      style={{
        backgroundColor: '#0033A0',
        color: 'white',
        height: '100%',
        padding: '5px 15px',
        fontSize: '0.9rem',
        display: 'flex',
        border: '1px solid #ccc',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {/* Left side - contact info */}
      <div className='topbarText'>SAP Dash Board</div>

      {/* Right side - social icons or links */}
      <Box
          component="img"
          src="pepsico-logo.jpg"
          alt="120k"
          sx={{ height: 50, objectFit: 'contain' }}
        />
    </div>
  );
};

export default Topbar;
