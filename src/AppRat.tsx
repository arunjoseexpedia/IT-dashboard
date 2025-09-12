import React, { useEffect, useState } from 'react';
const AppRat = () => {

  const [data, setData] = useState({
    savings: 100,
    mobilePlatform: 200,
    sapCE: 300,
  });

  useEffect(() => {
    // Simulate dynamic updates with a timer
    const interval = setInterval(() => {
      setData({
        savings: Math.floor(Math.random() * 1000),
        mobilePlatform: Math.floor(Math.random() * 1000),
        sapCE: Math.floor(Math.random() * 1000),
      });
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval); // Clean up
  }, []);
	return (
        
        <div style={{
           justifyContent: 'space-around',
            textAlign: 'center',
            alignItems: 'center',
          }}>
           
          
            <div>
              <div style={{ fontSize: '20px',fontWeight: 'bold', color:'#F08080' }}> {data.savings}</div>
              <div style={{ fontSize: '10px' }}>Dollar Savings</div>
            </div>
          
            <div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color:'#ADD8E6' }}>{data.mobilePlatform}</div>
              <div style={{ fontSize: '10px' }}>SAP Mobile Platform</div>
            </div>
          
            <div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color:'#FFA500' }}>{data.sapCE}</div>
              <div style={{ fontSize: '10px' }}>SAP CE</div>
            </div>
          </div>
        
      
	);
};

export default AppRat;