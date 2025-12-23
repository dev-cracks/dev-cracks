import React from 'react';
import { PillNav } from '../components/PillNav';
import './DashboardPage.css';

export const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <PillNav />
      <main className="dashboard-page__content">
        <div className="dashboard-page__container">
          <h1 className="dashboard-page__title">Dashboard</h1>
          <p className="dashboard-page__subtitle">Bienvenido al portal del cliente</p>
          
          <div className="dashboard-page__grid">
            <div className="dashboard-page__card">
              <h2>Resumen</h2>
              <p>Información general de tu cuenta</p>
            </div>
            <div className="dashboard-page__card">
              <h2>Actividad Reciente</h2>
              <p>Últimas acciones realizadas</p>
            </div>
            <div className="dashboard-page__card">
              <h2>Notificaciones</h2>
              <p>Mensajes y alertas importantes</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

