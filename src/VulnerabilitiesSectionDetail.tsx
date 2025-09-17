import React from 'react';
import Topbar from './Topbar';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
  } from '@mui/material';
  import { LineChart } from '@mui/x-charts/LineChart';
  
  
  
import './index.css';

const VulnerabilitiesSectionDetail = () => {
    const columns = ['Custom Code', 'Cluster', 'Sector', 'Planned Date', 'Completed Date'];

const rows = [
  { code: 'sqsprd:11', portal: 'PC1CT20', sector: 'NY', planned: '28/11/2024', completed: '28/09/2025' },
  {  code: 'dtclprd:13', portal: 'S3BCT6', sector: 'ATL', planned: '22/10/2024', completed: '28/08/2025'},
  {  code: 'isapprd:16', portal: 'PC1CT19', sector: 'PHX', planned: '09/11/2024', completed: '14/10/2025' },
  {  code: 'tclprd:09', portal: 'S3BCT6', sector: 'SEA',planned: '22/10/2024', completed: '28/08/2025'},
  { code: 'isapprd:19', portal: 'PC1CT09', sector: 'HOU', planned: '28/11/2024', completed: '28/09/2025'},
  { code: 'tclprd:21', portal: 'S3BCT21', sector: 'CLT', planned: '22/10/2024', completed: '28/08/2025'},
  { code: 'tclprd:11', portal: 'PC1CT12', sector: 'DEN', planned: '28/11/2024', completed: '28/09/2025' },
  {  code: 'sqsprd:16', portal: 'PC1CT18', sector: 'HOU', planned: '22/10/2024', completed: '28/08/2025' },
  { code: 'tclprd:21', portal: 'S3BCT21', sector: 'CLT', planned: '22/10/2024', completed: '28/08/2025'}
  
];
  return (
    <>
    <header style={{ height: '10%', borderRadius:'8px' }}>
        <Topbar />
      </header>
    <div className="dashboard-grid">
        
      <div className="left-cards">
        <div className="card"><center> <Typography variant="h6" >
                DB Volume
              </Typography></center> <LineChart
      width={300}
      height={200}
      series={[
        { data: [400, 300, 500, 200, 600], label: 'Revenue', color: '#1976d2' },
      ]}
      xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }]}
    /></div>
        <div className="card"><center> <Typography variant="h6" >
                Server Volume
              </Typography></center> <LineChart
    width={300}
    height={200}
    series={[
      {
        data: [100, 200, 150, 300, 250],
        label: 'SAP',
        color: '#4caf50',
        area: true,
        stack: 'traffic',
      },
      {
        data: [80, 120, 100, 200, 180],
        label: 'Legacy',
        color: '#ff9800',
        area: true,
        stack: 'traffic',
      },
    ]}
    xAxis={[{ scaleType: 'point', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }]}
  /></div>
        
      </div>
      <div className="right-table">
        <div className="table"><center> <Typography sx={{ fontWeight: 600 }} variant="h6" gutterBottom>
                Detail Report
              </Typography></center><TableContainer component={Paper} sx={{ maxWidth: '100%' }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow >
            {columns.map((col, index) => (
              <TableCell  key={index} sx={{ fontWeight: 'bold',color:'white' }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell>{row.code}</TableCell>
              <TableCell>{row.portal}</TableCell>
              <TableCell>{row.sector}</TableCell>
              <TableCell>{row.planned}</TableCell>
              <TableCell>{row.completed}</TableCell>
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