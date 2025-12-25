import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { ChallengePage } from './pages/ChallengePage';
import { CoursesPage } from './pages/CoursesPage';
import { CoursePage } from './pages/CoursePage';
import { CSharpCoursePage } from './pages/CSharpCoursePage';
import NotFoundPage from './pages/NotFoundPage';
import FloatingLines from './components/FloatingLines';
import { usePendo } from './hooks/usePendo';

// Fixed base path for dev-coach when accessed through unified server
const DEV_COACH_BASE = '/dev-coach';

const AppContent = () => {
  const location = useLocation();
  const isCSharpCourse = location.pathname === '/csharp-course';
  
  // Inicializar Pendo cuando el usuario esté autenticado
  usePendo();

  return (
    <>
      {!isCSharpCourse && (
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
      )}
      <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/challenge/:id" element={<ChallengePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:courseId" element={<CoursePage />} />
          <Route path="/csharp-course" element={<CSharpCoursePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => (
  <BrowserRouter basename={DEV_COACH_BASE}>
    <AppContent />
  </BrowserRouter>
);

export default App;

