import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ChallengePage } from './pages/ChallengePage';
import { CoursesPage } from './pages/CoursesPage';
import { CoursePage } from './pages/CoursePage';
import { NotFoundPage } from '@common/not-found';
import FloatingLines from './components/FloatingLines';

// Fixed base path for dev-coach when accessed through unified server
const DEV_COACH_BASE = '/dev-coach';

const App = () => (
  <>
    <FloatingLines
      enabledWaves={['top', 'middle', 'bottom']}
      lineCount={[10, 15, 20]}
      lineDistance={[8, 6, 4]}
      bendRadius={5.0}
      bendStrength={-0.5}
      interactive={true}
      parallax={true}
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
      <BrowserRouter basename={DEV_COACH_BASE}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/challenge/:id" element={<ChallengePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>
);

export default App;

