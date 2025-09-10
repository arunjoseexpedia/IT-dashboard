import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ThreeValueBarChart = ({ values = [40, 60, 80], labels = ['A', 'B', 'C'] }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Results',
        data: values,
        backgroundColor: ['#ff1493', '#00bfff', '#ffa500'], // Pink, Blue, Orange
        borderRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'App Rat' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ThreeValueBarChart;