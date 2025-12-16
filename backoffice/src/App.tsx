import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';

// Detectar automáticamente el base path basado en la URL actual
const getBasePath = () => {
  if (typeof window !== 'undefined') {
    // Si la URL contiene /backoffice, usar ese como base path
    if (window.location.pathname.startsWith('/backoffice')) {
      return '/backoffice';
    }
  }
  // Si hay una variable de entorno, usarla
  return import.meta.env.VITE_BACKOFFICE_BASE || '';
};

const App = () => {
  const basePath = getBasePath();
  return (
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

