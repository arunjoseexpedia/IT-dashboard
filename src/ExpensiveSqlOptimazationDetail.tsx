import React from 'react';
import Topbar from './Topbar';
import { useNavigate } from 'react-router-dom';
import { Link,Card,CardContent,Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper  } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ExpensiveSqlOptimazationDetail = () => {
  const navigate = useNavigate();

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
      {/* Card 1 */}
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          flex: '1',
        }}
      >
        Card 1
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
        Card 2
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
        Card 3
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
      >
        Card 1
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
        Card 2
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
        Card 3
      </div>
          </div>

          {/* Bottom full-width card with table */}
          <Card style={{ flex: 1, overflow: 'auto' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Data Table
              </Typography>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {[1, 2, 3, 4].map((id) => (
                      <TableRow key={id}>
                        <TableCell>{id}</TableCell>
                        <TableCell>User {id}</TableCell>
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