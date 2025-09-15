import React from 'react';
import Topbar from './Topbar';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const ExpensiveSqlOptimazationDetail = () => {
  const navigate = useNavigate();

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{ height: '10%', borderRadius:'8px' }}>
        <Topbar />
      </header>
      <div style={{ padding: '5px', alignSelf: 'flex-start'}}>
      <Link component={RouterLink} to="/" underline="hover" color="primary">
  Back
</Link>
      </div>
    </div>
  );
};