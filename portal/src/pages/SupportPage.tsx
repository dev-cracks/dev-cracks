import React from 'react';
import { PillNav } from '../components/PillNav';
import './SupportPage.css';

export const SupportPage = () => {
  return (
    <div className="support-page">
      <PillNav />
      <main className="support-page__content">
        <div className="support-page__container">
          <h1 className="support-page__title">Support</h1>
          <p className="support-page__subtitle">Centro de ayuda y soporte</p>
          
          <div className="support-page__grid">
            <div className="support-page__card">
              <h2>Documentación</h2>
              <p>Guías y documentación técnica</p>
            </div>
            <div className="support-page__card">
              <h2>Contacto</h2>
              <p>Ponte en contacto con nuestro equipo</p>
            </div>
            <div className="support-page__card">
              <h2>FAQ</h2>
              <p>Preguntas frecuentes</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

