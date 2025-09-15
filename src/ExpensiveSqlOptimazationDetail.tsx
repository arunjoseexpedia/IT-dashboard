import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ExpensiveSqlOptimazationDetail = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>hai</h1>
      <button onClick={() => navigate('/')}>Back to Dashboard</button>
    </div>
  );
};