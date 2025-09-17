import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { ExpensiveSqlOptimazation } from './ExpensiveSqlOptimazation';
import { ExpensiveSqlOptimazationDetail } from './ExpensiveSqlOptimazationDetail';
import VulnerabilitiesSectionDetail from './VulnerabilitiesSectionDetail'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
      <Route path="ExpensiveSqlOptimazation" element={<ExpensiveSqlOptimazation />} /> 
          
      
      </Route>
      <Route path="/ExpensiveSqlOptimazationDetail" element={<ExpensiveSqlOptimazationDetail />} />
      <Route path="/VulnerabilitiesSectionDetail" element={<VulnerabilitiesSectionDetail />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
