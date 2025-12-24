import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ChallengePage } from './pages/ChallengePage';
import NotFoundPage from './pages/NotFoundPage';

// Fixed base path for dev-coach when accessed through unified server
const DEV_COACH_BASE = '/dev-coach';

const App = () => (
  <BrowserRouter basename={DEV_COACH_BASE}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/challenge/:id" element={<ChallengePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

