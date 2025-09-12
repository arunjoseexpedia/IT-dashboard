
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExpensiveSqlOptimazation = () => {
  const [dataValues, setDataValues] = useState([50, 30, 20, 10]);
  const [memoryUsage, setMemoryUsage] = useState(39000);
  const [execTime, setExecTime] = useState(805000);

  useEffect(() => {
    // Update values randomly every 3 seconds
    const interval = setInterval(() => {
      // Generate random values with some logic or constraints
      const queriesAnalyzed = Math.floor(Math.random() * 100) + 20;  // 20 - 119
      const queriesDispositioned = Math.floor(Math.random() * 80) + 10; // 10 - 89
      const inProgress = Math.floor(Math.random() * 50) + 5; // 5 - 54
      const optimized = Math.floor(Math.random() * 30) + 1; // 1 - 30

      setDataValues([queriesAnalyzed, queriesDispositioned, inProgress, optimized]);

      setMemoryUsage(Math.floor(Math.random() * 100000) + 20000);  // 20k - 120k
      setExecTime(Math.floor(Math.random() * 1000000) + 500000);  // 500k - 1.5M
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: ['Queries Analyzed', 'Queries Dispositioned', 'In Progress','High Memory/time Intensive queries optimized'],
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#d4edda'], // green, yellow, red, light green
        borderWidth: 2,
      },
    ],
  };

  return (
    <div style={{ textAlign: 'left', margin: 'auto' }}>
      {/* Top text */}
      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>
        Expensive SQL Optimazation
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', margin: '0 auto', textAlign: 'left' }}>
          <Doughnut
            data={data}
            options={{
              plugins: {
                legend: {
                  display: false, // Hide default legend
                },
              },
              cutout: '60%',
            }}
          />

          {/* Custom color-coded labels */}
        </div>
        <div style={{ marginTop: '1px' }}>
          {data.labels.map((label, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  backgroundColor: data.datasets[0].backgroundColor[i],
                  borderRadius: '50%',
                  marginRight: '8px',
                }}
              ></span>
              <span style={{ fontSize: '12px' }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography sx={{ color: '#00000066' }}>
            {(memoryUsage / 1000).toFixed(1)} K - Memory Usage Reduction/day
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: '#00000066' }}>
            {(execTime / 1000).toFixed(1)} K - Execution Time Reduction/day
          </Typography>
        </Box>
      </Box>
    </div>
  );
};
