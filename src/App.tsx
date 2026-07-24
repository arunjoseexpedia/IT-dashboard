import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import FloatingChatButton from './components/FloatingChatButton';



function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
      </Routes>
      <FloatingChatButton />
    </HashRouter>
  );
}

export default App;
