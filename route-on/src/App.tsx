import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from '@common/not-found';
import { LanguageSelector } from './components/LanguageSelector';

// Fixed base path for route-on when accessed through unified server
const ROUTE_ON_BASE = '/route-on';

const App = () => (
  <>
    <LanguageSelector />
    <BrowserRouter basename={ROUTE_ON_BASE}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </>
);

export default App;

