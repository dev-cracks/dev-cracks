import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';

// Fixed base path for landing when accessed through unified server
const LANDING_BASE = '/landing';

const App = () => (
  <BrowserRouter basename={LANDING_BASE}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

