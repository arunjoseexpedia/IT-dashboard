import {  Grid } from '@mui/material';
import React from 'react';
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
    const data = {
        labels: ['Queries Analyzed', 'Queries Dispositioned', 'In Progress','High Memory/time Intensive queries optimized'],
        datasets: [
          {
            data: [50, 30, 20,10],
            backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#d4edda'], // green, yellow, red
            borderWidth: 2,
          },
        ],
      };
  
	return (
		<div style={{ textAlign: 'left',  margin: 'auto' }}>
      {/* Top text */}
      <div style={{  fontSize: '14px', fontWeight: 'bold' }}>
      Expensive SQL Optimazation
      </div>
      <div style={{display: 'flex'}}>
      <div style={{ width: '200px', margin: '0 auto', textAlign: 'left' }}>
      <Doughnut data={data} options={{
        plugins: {
          legend: {
            display: false, // Hide default legend
          },
        },
        cutout: '60%',
      }} />

      {/* Custom color-coded labels */}
     
      
      </div>
      <div style={{ marginTop: '1px' }}>
        {data.labels.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0px' }}>
            <span style={{
              display: 'inline-block',
              width: '12px',
              height: '12px',
              backgroundColor: data.datasets[0].backgroundColor[i],
              borderRadius: '50%',
              marginRight: '8px',
            }}></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      </div>
      <Box
				sx={{ display: 'flex', justifyContent: 'space-between'}}
			>
				<Box>
					<Typography  sx={{ color: '#00000066' }}>
						39 K - Memory Usage Reduction/day
					</Typography>
					
				</Box>
				<Box>
					<Typography  sx={{ color: '#00000066' }}>
						805 K - Execution Time Reduction/day
					</Typography>
					
				</Box>
                </Box>		
    </div>
      
    
	);
};
