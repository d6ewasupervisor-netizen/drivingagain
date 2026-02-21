import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Garage from './components/Garage';
import Driving from './components/Driving';
import ParentDashboard from './components/ParentDashboard';
import Intro from './components/Intro';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/garage" element={<Garage />} />
        <Route path="/drive" element={<Driving />} />
        <Route path="/parent" element={<ParentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
