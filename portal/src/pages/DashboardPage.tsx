import React from 'react';
import { PillNav } from '../components/PillNav';
import DarkVeil from '../components/DarkVeil';
import MagicBento from '../components/MagicBento';
import './DashboardPage.css';

export const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <DarkVeil />
      </div>
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

          <MagicBento 
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </div>
      </main>
    </div>
  );
};

