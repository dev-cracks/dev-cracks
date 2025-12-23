import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GhostCursorPage } from './pages/GhostCursorPage';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GhostCursorPage />} />
    </Routes>
  </BrowserRouter>
);

export default App;
