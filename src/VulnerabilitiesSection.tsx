

import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export const VulnerabilitiesSection = () => {
  const [remainingLow, setRemainingLow] = useState(5);
  const [medium, setMedium] = useState(125);
  const [disposition, setDisposition] = useState(2000);
  const [analyzed, setAnalyzed] = useState(11000);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
      const randomMedium = Math.floor(Math.random() * (300 - 125 + 1)) + 125;
      const dispositionMedium = Math.floor(Math.random() * (3300 - 2000 + 1)) + 2000;
      const analyzedMedium = Math.floor(Math.random() * (66000 - 11000 + 1)) + 11000;
      setRemainingLow(randomValue);
      setMedium(randomMedium);
      setDisposition(dispositionMedium);
      setAnalyzed(analyzedMedium);
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
 
  
	return (
		<div style={{ textAlign: 'center',  margin: 'auto' }}>
      {/* Top text */}
      <Typography sx={{ fontSize: '15px', fontWeight: 'bold', cursor:'pointer',
         transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.25)',
        }}}> Vulnerabilities</Typography>
     

      {/* Two texts side by side */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
      <Typography sx={{ fontSize: '12px', fontWeight: 'bold',flex: 2,  cursor:'pointer',
         transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        }}}>Custom Code Vulnerabilitie</Typography>
      <Typography sx={{ fontSize: '12px', fontWeight: 'bold',flex: 2,  cursor:'pointer',
         transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.05)',
        } }}> SAP Portal Vulnerabilities</Typography>
      </div>

      {/* Two numbers side by side */}
      <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold', fontSize: '18px' }}>
        <div style={{ flex: 1,background:'#fdf5e6' }}>{analyzed}</div>
        <div style={{ flex: 1 ,background:'#FFE4E1'}}>{disposition}</div>
        <div style={{ flex: 1,background:'#FFB6C1' }}>{medium}</div>
        <div style={{ flex: 1, background:'#F08080' }}>{remainingLow}</div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold', fontSize: '18px' }}>
        <div style={{ flex: 1 , fontSize:'10px'}}>Analyzed</div>
        <div style={{ flex: 1,fontSize:'10px' }}>Disposition/Remediated</div>
        <div style={{ flex: 1,fontSize:'10px' }}>Detected (Critical, High, & Medium)</div>
        <div style={{ flex: 1,fontSize:'10px' }}>Remaining (Low)</div>
      </div>
    </div>
	);
};
