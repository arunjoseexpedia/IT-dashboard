import {  Grid } from '@mui/material';
import React from 'react';

export const VulnerabilitiesSection = () => {
 
  
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
        <div style={{ flex: 1,background:'#FFB6C1' }}>125</div>
        <div style={{ flex: 1, background:'#F08080' }}>5</div>
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
