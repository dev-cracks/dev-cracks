import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GhostCursorPage } from './pages/GhostCursorPage';

// Fixed base path for portal when accessed through unified server
const PORTAL_BASE = '/portal';

const App = () => (
  <BrowserRouter basename={PORTAL_BASE}>
    <Routes>
      <Route path="/" element={<GhostCursorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;

