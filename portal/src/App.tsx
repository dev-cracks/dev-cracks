import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AccountPage } from './pages/AccountPage';
import { SupportPage } from './pages/SupportPage';

// Fixed base path for portal when accessed through unified server
const PORTAL_BASE = '/portal';

const App = () => (
  <BrowserRouter basename={PORTAL_BASE}>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/support" element={<SupportPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

