import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@fluentui/react-components';
import { Layout } from './components/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { UsersPage } from './pages/UsersPage';
import { TenantsPage } from './pages/TenantsPage';
import { CustomersPage } from './pages/CustomersPage';
import { OfficesPage } from './pages/OfficesPage';
import { SettingsPage } from './pages/SettingsPage';
import { LoginPage } from './pages/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';

// Fixed base path for backoffice when accessed through unified server
const BACKOFFICE_BASE = '/backoffice';

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter basename={BACKOFFICE_BASE}>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <DashboardPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Layout>
                <UsersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/tenants"
          element={
            <ProtectedRoute>
              <Layout>
                <TenantsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Layout>
                <CustomersPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/offices"
          element={
            <ProtectedRoute>
              <Layout>
                <OfficesPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Layout>
                <SettingsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;

