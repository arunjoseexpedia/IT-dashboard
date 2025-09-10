import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register only the elements we need
ChartJS.register(ArcElement, Tooltip, Legend);

const HalfCircleChart = ({ percentage = 75 }) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#ff1493', '#e0e0e0'],
        borderWidth: 0,
        cutout: '70%', // Size of the inner radius
      },
    ],
  };

  const options = {
    rotation: -90, // Start angle
    circumference: 180, // Half-circle
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div style={{ width: '90%', height: '90px', position: 'relative' }}>
    <Doughnut data={data} options={options} />
    <div style={{
      position: 'absolute',
      bottom: '10px',
      width: '100%',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    }}>
      {percentage}%
    </div>
  </div>
  );
};

export default HalfCircleChart;