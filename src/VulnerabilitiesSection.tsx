

import React, { useEffect, useState } from 'react';

export const VulnerabilitiesSection = () => {
  const [remainingLow, setRemainingLow] = useState(5);
  const [medium, setMedium] = useState(125);
  useEffect(() => {
    const interval = setInterval(() => {
      const randomValue = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
      const randomMedium = Math.floor(Math.random() * (300 - 125 + 1)) + 125;
      setRemainingLow(randomValue);
      setMedium(randomMedium);
    }, 3000); // update every 3 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
 
  
	return (
		<div style={{ textAlign: 'center',  margin: 'auto' }}>
      {/* Top text */}
      <div style={{ marginBottom: '20px', fontSize: '15px', fontWeight: 'bold' }}>
      Vulnerabilities
      </div>

      {/* Two texts side by side */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '10px' }}>
        <div style={{ flex: 2 }}>Custom Code Vulnerabilities</div>
        <div style={{ flex: 2 }}> SAP Portal Vulnerabilities</div>
      </div>

      {/* Two numbers side by side */}
      <div style={{ display: 'flex', justifyContent: 'space-around', fontWeight: 'bold', fontSize: '18px' }}>
        <div style={{ flex: 1,background:'#fdf5e6' }}>11000</div>
        <div style={{ flex: 1 ,background:'#FFE4E1'}}>2000</div>
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
