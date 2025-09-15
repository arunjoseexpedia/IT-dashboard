import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { ExpensiveSqlOptimazation } from './ExpensiveSqlOptimazation';
import { ExpensiveSqlOptimazationDetail } from './ExpensiveSqlOptimazationDetail';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="ExpensiveSqlOptimazation" element={<ExpensiveSqlOptimazation />} /> 
          
      
      </Route>
      <Route path="/ExpensiveSqlOptimazationDetail" element={<ExpensiveSqlOptimazationDetail />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
