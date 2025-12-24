import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ChallengePage } from './pages/ChallengePage';
import { CoursesPage } from './pages/CoursesPage';
import { CoursePage } from './pages/CoursePage';
import NotFoundPage from './pages/NotFoundPage';
import DotGrid from './components/DotGrid';

// Fixed base path for dev-coach when accessed through unified server
const DEV_COACH_BASE = '/dev-coach';

const App = () => (
  <>
    <DotGrid
      dotSize={10}
      gap={15}
      baseColor="#5227FF"
      activeColor="#5227FF"
      proximity={120}
      shockRadius={250}
      shockStrength={5}
      resistance={750}
      returnDuration={1.5}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none'
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

