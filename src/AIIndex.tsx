import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
const AIIndex = () => {
  const [data, setData] = useState(0.4);
  useEffect(() => {
    // Simulate dynamic updates with a timer
    const interval = setInterval(() => {
      setData(Math.floor(Math.random() * 1000));
    }, 3000); 
    return () => clearInterval(interval);
  },[]);
	return (
        
        <div style={{
           justifyContent: 'space-around',
            textAlign: 'center',
            alignItems: 'center',
          }}>
           
          
           
          
          
          
            <div>
              <div style={{ fontSize: '15px', fontWeight: 'bold'  }}><Typography
  sx={{
    fontWeight: 'bold',
    fontSize: '17px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#0033a0',
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  }}>AIIndex</Typography></div>
             <div style={{display:'flex',marginLeft:'25px', color:'#FFA500',}}> <div style={{ fontSize: '30px' }}>{data} MM </div>&nbsp;<div style={{marginTop:'15px',padding:'4px',height:'20px',fontSize:'13px',background:'#E9142B',boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',color: 'white'}}><i>savings</i></div></div>
              <div style={{ fontSize: '10px' }}><Typography
  sx={{
    fontWeight: 'bold',
    fontSize: '12px',
    transition: 'color 0.3s ease, transform 0.3s ease',
    '&:hover': {
      color: '#0033a0',
      transform: 'scale(1.1)',
      cursor: 'pointer',
    },
  }}>AIIndex</Typography></div>
            </div>
          </div>
        
      
	);
};

export default AIIndex;