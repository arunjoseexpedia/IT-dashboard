import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ThreeValueTable = () => {
  const processed = 9873;
  const inProgress = 98;
  const completedPercent = 57;
  const completed = Math.round((processed * completedPercent) / 100);
  const remaining = processed - completed;

  const data = {
    labels: ['Completed', 'Remaining', 'In Progress'],
    datasets: [
      {
        label: 'Number of Requests',
        data: [completed, remaining, inProgress],
        backgroundColor: [
          'rgba(0, 92, 180, 0.7)',    // Pepsico blue
          'rgba(0, 92, 180, 0.3)',    // lighter Pepsico blue
          'rgba(255, 165, 0, 0.7)',   // orange
        ],
        borderColor: [
          'rgba(0, 92, 180, 1)',
          'rgba(0, 92, 180, 0.6)',
          'rgba(255, 165, 0, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1000 },
        title: {
          display: true,
          text: 'Requests Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Status',
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <Bar data={data} options={options} />

      <div style={{ marginTop: 10, textAlign: 'center' }}>
        <p style={{fontSize:'12px'}}>Processed:<span> {processed.toLocaleString()}</span></p>
        <p style={{fontSize:'12px'}}>Completed: <span>{completed.toLocaleString()} ({completedPercent}%)</span></p>
        <p style={{fontSize:'12px'}}>Remaining: <span>{remaining.toLocaleString()}</span></p>
        <p style={{fontSize:'12px'}}>In Progress:<span style={{backgroundColor:'#ec5e95',fontWeight:600,color:'white',textAlign:'center', padding:'5px',paddingLeft:'2px', borderRadius:'50%'}}> {inProgress.toLocaleString()}</span></p>
      </div>
    </div>
  );
};

export default ThreeValueTable;