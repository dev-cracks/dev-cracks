import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import SigningPage from './pages/SigningPage';
import Dashboard from './pages/Dashboard';
import RequestSignature from './pages/RequestSignature';
import Documents from './pages/Documents';
import Reports from './pages/Reports';
import Incidents from './pages/Incidents';

const theme = createTheme({
  palette: {
    primary: {
      main: '#58a6ff',
    },
    secondary: {
      main: '#f0883e',
    },
    mode: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        {/* Rutas públicas para firma (sin layout) */}
        <Route path="/sign" element={<SigningPage />} />
        <Route path="/sign/:token" element={<SigningPage />} />
        
        {/* Rutas de la aplicación (con layout y protección) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout>
                <Outlet />
              </Layout>
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="request-signature" element={<RequestSignature />} />
          <Route path="documents" element={<Documents />} />
          <Route path="reports" element={<Reports />} />
          <Route path="incidents" element={<Incidents />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
