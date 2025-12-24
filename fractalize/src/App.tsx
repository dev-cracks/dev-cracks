import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Fixed base path for fractalize when accessed through unified server
const FRACTALIZE_BASE = '/fractalize';

const App = () => (
  <BrowserRouter basename={FRACTALIZE_BASE}>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

