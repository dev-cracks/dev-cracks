import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GhostCursorPage } from './pages/GhostCursorPage';
import { DashboardPage } from './pages/DashboardPage';
import { AccountPage } from './pages/AccountPage';
import { SupportPage } from './pages/SupportPage';
import NotFoundPage from './pages/NotFoundPage';
import FloatingIcon from './components/FloatingIcon';

// Fixed base path for portal when accessed through unified server
const PORTAL_BASE = '/portal';

const App = () => (
  <BrowserRouter basename={PORTAL_BASE}>
    <Routes>
      <Route path="/" element={<GhostCursorPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    <FloatingIcon />
  </BrowserRouter>
);

export default App;

