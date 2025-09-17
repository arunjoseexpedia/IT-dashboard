import React from 'react';
import Topbar from './Topbar';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
  } from '@mui/material';
  import { LineChart } from '@mui/x-charts/LineChart';
  
  
  
import './index.css';

const VulnerabilitiesSectionDetail = () => {
    const columns = ['Name', 'Age', 'Position', 'Department', 'Location'];

const rows = [
  { name: 'Alice', age: 30, position: 'Engineer', department: 'R&D', location: 'NY' },
  { name: 'Bob', age: 28, position: 'Designer', department: 'UX', location: 'SF' },
  { name: 'Charlie', age: 35, position: 'Manager', department: 'HR', location: 'LA' },
  { name: 'Diana', age: 32, position: 'Developer', department: 'IT', location: 'Austin' },
  { name: 'Ethan', age: 27, position: 'Analyst', department: 'Finance', location: 'Chicago' },
  { name: 'Alice', age: 30, position: 'Engineer', department: 'R&D', location: 'NY' },
  { name: 'Bob', age: 28, position: 'Designer', department: 'UX', location: 'SF' },
  { name: 'Charlie', age: 35, position: 'Manager', department: 'HR', location: 'LA' },
  
];
  return (
    <>
    <header style={{ height: '10%', borderRadius:'8px' }}>
        <Topbar />
      </header>
    <div className="dashboard-grid">
        
      <div className="left-cards">
        <div className="card"> <LineChart
      width={300}
      height={200}
      series={[
        { data: [400, 300, 500, 200, 600], label: 'Revenue', color: '#1976d2' },
      ]}
      xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }]}
    /></div>
        <div className="card"> <LineChart
    width={300}
    height={200}
    series={[
      {
        data: [100, 200, 150, 300, 250],
        label: 'Desktop',
        color: '#4caf50',
        area: true,
        stack: 'traffic',
      },
      {
        data: [80, 120, 100, 200, 180],
        label: 'Mobile',
        color: '#ff9800',
        area: true,
        stack: 'traffic',
      },
    ]}
    xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }]}
  /></div>
        
      </div>
      <div className="right-table">
        <div className="table"><TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index} sx={{ fontWeight: 'bold' }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.position}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>{row.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer></div>
      </div>
     
    </div>
    </>
  );
};

export default VulnerabilitiesSectionDetail;