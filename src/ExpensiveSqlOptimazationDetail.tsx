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
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column',backgroundColor:'#3A4862' }}>
      {/* Header */}
      <header style={{ height: '10%', borderRadius:'8px' }}>
        <Topbar />
      </header>
      
      <div style={{ display: 'flex', flex: 1,margin:0 }}>
    {/* Left section (e.g., sidebar) */}
    <div
      style={{
        margin:0,
        width: '20%',
        paddingTop:'10px',
        paddingBottom:'10px',
        paddingLeft:'8px',
        backgroundColor: '#D3D3D3',
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
          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
          flex: '1',
        }}
      >
       <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
      <div>
              <div style={{ fontSize: '15px',padding:'20px', fontWeight: 'bold'}}>Users</div>
              <div style={{ fontSize: '33px',padding:'10px',color:'#0d0d0d' }}>144 K</div>
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
          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
          flex: '1',
        }}
      >
         <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
      <div>
              <div style={{ fontSize: '15px',padding:'20px', fontWeight: 'bold'}}>Conversions</div>
              <div style={{ fontSize: '33px',padding:'10px',color:'#0d0d0d' }}>325 K</div>
            </div>
      </Box>
      <Box sx={{ flexGrow: 1, padding:'20px' }}>
      <SparkLineChart data={[3, -10, -2, 5, 7, -2, 4, 6]} height={100} curve="natural"
    area/>
      </Box>
    </Stack>
      </div>

      {/* Card 3 */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
          flex: '1',
        }}
      >
        <Stack direction="row" sx={{ width: '100%' }}>
      <Box sx={{ flexGrow: 1 }}>
      <div>
              <div style={{ fontSize: '15px',padding:'20px', fontWeight: 'bold'}}>Event count</div>
              <div style={{ fontSize: '33px',padding:'10px',color:'#0d0d0d' }}>200 K</div>
            </div>
      </Box>
      <Box sx={{ flexGrow: 1, padding:'20px' }}>
      <SparkLineChart data={[7, 4, 2, 8, 7, 3, 5, 6]} height={100} area/>
      </Box>
    </Stack>
      </div>
      </div>
    {/* Right section (main content) */}
    <div style={{ display: 'flex', flex: 1,width: '20%',
        padding: '0px',
        margin: 0,
        backgroundColor: '#D3D3D3',
        
       }}>
      
        
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
      > <h6 style={{ textAlign: "center" }}># Servers By DB Info</h6><center><Gauge
      width={200}
      color="#3A4862"
      height={200}
      value={11191}
      startAngle={0}
      endAngle={360}
      
    /></center>
        </div>
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
        }}
      > <h6 style={{ textAlign: "center" }}># Servers By APPL.5</h6>
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
      > <h6 style={{ textAlign: "center" }}># Servers By DB Technology</h6>
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
             <center> <Typography sx={{ fontWeight: 600 }} variant="h6" gutterBottom>
                Detail Report
              </Typography></center>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow >
                      <TableCell sx={{ fontWeight: 'bold',color:'white'}}>Target Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold',color:'white'}}>Server_Name</TableCell>
                      <TableCell sx={{ fontWeight: 'bold',color:'white'}}>Server_Owner</TableCell>
                      <TableCell sx={{ fontWeight: 'bold',color:'white'}}>App_Status</TableCell>
                      <TableCell sx={{ fontWeight: 'bold',color:'white'}}>App_Name</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[{id:1,name:'Rafale Silva',serverName:'ADPWSQAPRDL01',appName:'ISG SSO RPA AUTOMATION'}, {id:2,name:'John Mathew',serverName:'ADPWSQAPRDB01',appName:'AI and Machine Learning Platform'}, {id:3,name:'Troy Harrison',serverName:'ADPWSQAPRD206',appName:'ISG SSO RPA AUTOMATION'}, {id:4, name:'Johan Silva',serverName:'ADPWSQAPRDL02',appName:'ISG SSO RPA AUTOMATION'},{id:5, name:'Chris Mathew',serverName:'ADPWSQAPRD301',appName:'ISG SSO RPA AUTOMATION'}].map((id,index) => (
                      <TableRow key={id.id}>
                        <TableCell >Master</TableCell>
                        <TableCell >{id.serverName}</TableCell>
                        <TableCell >{id.name}</TableCell>
                        <TableCell >{id.id % 2 === 0 ? 'Active' : 'Inactive'}</TableCell>
                        <TableCell >{id.appName}</TableCell>
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