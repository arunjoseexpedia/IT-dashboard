import React from 'react';

export default function ProductRoadMap() {
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      {/* Heading */}
      <h4>Product EOL Road Map</h4>

      {/* Text & Value side by side */}
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
        {/* First Column */}
        <div>
          <div style={{ fontSize: '14px', color: '#666',borderRight:'3px solid pink' }}>Portal</div>
          <div style={{display:'flex'}}> <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffc107' }}>2027</div><div style={{fontSize:'8px',marginTop:'10px',paddingTop:'2px',height:'15px',backgroundColor:'#9cee69'}}><i>Re-platform</i></div></div>
        </div>

        {/* Second Column */}
        <div>
          <div style={{ fontSize: '14px', color: '#666', borderRight:'3px solid pink' }}>WM</div>
          <div style={{display:'flex'}}> <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffc107' }}>2027</div><div style={{fontSize:'8px',marginTop:'10px',paddingTop:'2px',height:'15px',backgroundColor:'#9cee69'}}><i>Re-platform</i></div></div>
        </div>
        <div>
          <div style={{ fontSize: '14px', color: '#666',borderRight:'3px solid pink' }}>SolMan</div>
          <div style={{display:'flex'}}> <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffc107' }}>2027</div><div style={{fontSize:'8px',marginTop:'10px',paddingTop:'2px',height:'15px',backgroundColor:'#9cee69'}}><i>Re-platform</i></div></div>
        </div>
        <div>
          <div style={{ fontSize: '14px', color: '#666',borderRight:'3px solid pink',paddingRight:'2px' }}>SAP gateway/Fiori</div>
          <div style={{display:'flex'}}> <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffc107' }}>2027</div><div style={{fontSize:'8px',marginTop:'10px',paddingTop:'2px',height:'15px',backgroundColor:'#9cee69'}}><i>Re-platform</i></div></div>
        </div>
        <div>
          <div style={{ fontSize: '14px', color: '#666',borderRight:'3px solid pink',paddingRight:'2px' }}>Live Compare</div>
          <div style={{display:'flex'}}> <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffc107' }}>2026</div><div style={{fontSize:'10px',marginTop:'10px',height:'15px',backgroundColor:'#9cee69'}}><i>upgrade</i></div></div>
        </div>
        <div>
          <div style={{ fontSize: '14px', color: '#666' }}>Data Masking</div>
         <div style={{display:'flex'}}> <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#ffc107' }}>2026</div><div style={{fontSize:'10px',marginTop:'10px',height:'15px',backgroundColor:'#9cee69'}}><i>upgrade</i></div></div>
        </div>
      </div>
    </div>
  );
}