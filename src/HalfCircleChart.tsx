import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register only the elements we need
ChartJS.register(ArcElement, Tooltip, Legend);

const HalfCircleChart = () => {
  const [percentage, setPercentage] = useState(75);
  

  useEffect(() => {
    const sequence = [25, 30, 50, 75]; // values to cycle through
    let index = 0;

    const interval = setInterval(() => {
      setPercentage(sequence[index]);
      index = (index + 1) % sequence.length; // loop back to start
    }, 2000); // change every 2 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: ['#3A4862', '#e0e0e0'],
        borderWidth: 0,
        cutout: '70%',
      },
    ],
  };

  const options = {
    rotation: -90,
    circumference: 180,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div style={{ width: '90%', height: '90px', position: 'relative' }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          width: '100%',
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default HalfCircleChart;