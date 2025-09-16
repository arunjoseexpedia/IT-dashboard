import React from 'react';
import Topbar from './Topbar';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { Gauge } from '@mui/x-charts/Gauge';
import { BarChart } from '@mui/x-charts/BarChart';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Link,Card,CardContent,Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ExpensiveSqlOptimazationDetail = () => {
  const navigate = useNavigate();
  const data = [
    { label: 'SQL SERVER', value: 3750 },
    { label: 'ORACLE', value: 2708 },
    { label: 'MONGODB', value: 1958 },
    { label: 'POSTGRESQL', value: 1116 },
  ];

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column',backgroundColor:'#f0f0f0' }}>
      {/* Header */}
      <header style={{ height: '10%', borderRadius:'8px' }}>
        <Topbar />
      </header>
      <div style={{ padding: '5px', alignSelf: 'flex-start'}}>
      <Link component={RouterLink} to="/" underline="hover" color="primary">
  Back
</Link>
      </div>
      <div style={{ display: 'flex', flex: 1 }}>
    {/* Left section (e.g., sidebar) */}
    <div
      style={{
        width: '20%',
        padding: '10px',
        backgroundColor: '#f0f0f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px', // space between cards
      }}
    >
    
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
        }}
      >
       <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
      <div>
              <div style={{ fontSize: '15px',padding:'20px', fontWeight: 'bold'}}>Users</div>
              <div style={{ fontSize: '33px',padding:'10px' }}>144 K</div>
            </div>
      </Box>
      <Box sx={{ flexGrow: 1, padding:'20px' }}>
      <SparkLineChart data={[1, 4, 2, 5, 7, 2, 4, 6]} height={100} />
      </Box>
    </Stack>
      </div>

      {/* Card 2 */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
        }}
      >
         <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
      <div>
              <div style={{ fontSize: '15px',padding:'20px', fontWeight: 'bold'}}>Conversions</div>
              <div style={{ fontSize: '33px',padding:'10px' }}>325 K</div>
            </div>
      </Box>
      <Box sx={{ flexGrow: 1, padding:'20px' }}>
      <SparkLineChart data={[6, 8, 2, 5, 7, 2, 4, 6]} height={100} />
      </Box>
    </Stack>
      </div>

      {/* Card 3 */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
        }}
      >
        <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
      <div>
              <div style={{ fontSize: '15px',padding:'20px', fontWeight: 'bold'}}>Event count</div>
              <div style={{ fontSize: '33px',padding:'10px' }}>200 K</div>
            </div>
      </Box>
      <Box sx={{ flexGrow: 1, padding:'20px' }}>
      <SparkLineChart data={[7, 4, 2, 8, 7, 3, 5, 6]} height={100} />
      </Box>
    </Stack>
      </div>
      </div>
    {/* Right section (main content) */}
    <div style={{ display: 'flex', flex: 1,width: '20%',
        padding: '10px',
        backgroundColor: '#f0f0f0'
       }}>
        {/* Left section with vertical cards */}
        
        {/* Right section */}
        <div
          style={{
            flex: 1,
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {/* Top horizontal 3 cards */}
          <div style={{ display: 'flex',flex: 1, gap: '10px' }}>
          <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
        }}
      > <Gauge
      width={200}
      height={200}
      value={11191}
      startAngle={0}
      endAngle={360}
    />
        </div>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
        }}
      >
      <BarChart
        layout="horizontal" // Make it horizontal
        series={[
          {
            data: [144],
            label: 'Users',
            color: '#1976d2',
          },
        ]}
        yAxis={[
          {
            data: [''], // No label needed
            scaleType: 'band',
          },
        ]}
        xAxis={[
          {
            min: 0,
            max: 200, // Optional: sets full scale
          },
        ]}
        height={100}
        width={300} // You can also set this to "100%" using a wrapper Box
        sx={{
          '& .MuiBarElement-root': {
            height: 40, // This controls bar thickness (height since horizontal layout)
                // Rounded corners (optional)
          },
        }}
      />
      </div>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
        }}
      >
         <BarChart
        layout="horizontal"
        series={[
          {
            data: data.map((d) => d.value),
            label: 'Metric Value',
            color: '#1976d2',
          },
        ]}
        yAxis={[
          {
            data: data.map((d) => d.label),
            scaleType: 'band',
          },
        ]}
        xAxis={[
          {
            min: 0,
            max: 4000, // Optional: adjust based on your highest value
          },
        ]}
        height={data.length * 50} // Controls spacing between bars
        width={300}
        sx={{
          '& .MuiBarElement-root': {
            height: 30, // Thickness of each bar
            // Rounded corners (optional)
          },
        }}
      />
      </div>
          </div>

          {/* Bottom full-width card with table */}
          <Card style={{ flex: 1, overflow: 'auto' }}>
            <CardContent>
             <center> <Typography variant="h6" gutterBottom>
                Detail Report
              </Typography></center>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Target Name</TableCell>
                      <TableCell>Server_Name</TableCell>
                      <TableCell>Server_Owner</TableCell>
                      <TableCell>App_Id</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3, 4].map((id) => (
                      <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>User {id}</TableCell>
                        <TableCell>{id % 2 === 0 ? 'Active' : 'Inactive'}</TableCell>
                        <TableCell>{id % 2 === 0 ? 'Active' : 'Inactive'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
    </div>
  );
};