import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import Threads from './components/Threads';

// Fixed base path for dev-pool when accessed through unified server
const DEV_POOL_BASE = '/dev-pool';

const App = () => (
  <>
    <Threads
      amplitude={1}
      distance={0}
      enableMouseInteraction={true}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0
      }}
    />
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <BrowserRouter basename={DEV_POOL_BASE}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
);

export default App;

