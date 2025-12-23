import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { GhostCursorPage } from './pages/GhostCursorPage';

const App = () => {
  // Verificar si ya se vio el splash screen y redirigir directamente a /landing
  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplashScreen');
    
    if (hasSeenSplash === 'true') {
      // Si ya se vio el splash, redirigir directamente a /landing
      window.location.href = '/landing';
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GhostCursorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
