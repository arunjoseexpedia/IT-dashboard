import React from 'react';

export default function ThreeValueTable({
  data = [
    { label: 'Label A', value: 100 },
    { label: 'Label B', value: 200 },
    { label: 'Label C', value: 300 },
  ],
  
}) {
    const rowColors = ['#ffe4e1', '#e0ffff', '#fffacd'];
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      maxWidth: '300px',
      margin: '20px auto',
      
      fontFamily: 'Arial, sans-serif',
    }}>
      {data.map((item, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #ccc',
            backgroundColor: rowColors[index % rowColors.length],
            padding: '8px 0',
          }}
        >
          <div style={{ color: '#333',  padding:'10px', fontSize:'12px' }}>{item.label}</div>
          <div style={{ fontWeight: 'bold',boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',backgroundColor:'#FF1675', color: 'white',padding:'10px',fontSize:'12px', borderRadius:'70%' }}>{item.value}</div>
        </div>
      ))}
    </div>
  );
}