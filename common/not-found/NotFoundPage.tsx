import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GridScan } from './GridScan';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('common');

  // Determinar la ruta de retorno basada en la ruta actual
  const getHomePath = () => {
    const pathname = location.pathname;
    
    // Si estamos en una ruta que contiene /dashboard, ir a /dashboard
    if (pathname.includes('/dashboard')) {
      return '/dashboard';
    }
    
    // Si estamos en backoffice, ir a /dashboard
    if (pathname.includes('/backoffice')) {
      return '/dashboard';
    }
    
    // Por defecto, ir a la raíz
    return '/';
  };

  const handleGoHome = () => {
    navigate(getHomePath());
  };

  return (
    <div className="not-found-page">
      <div className="not-found-page__background">
        <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#392e4e"
          gridScale={0.1}
          scanColor="#FF9FFC"
          scanOpacity={0.4}
          enablePost={true}
          bloomIntensity={0.6}
          chromaticAberration={0.002}
          noiseIntensity={0.01}
        />
      </div>
      <div className="not-found-page__content">
        <div className="not-found-page__glitch" data-text="404">
          404
        </div>
        <h2 className="not-found-page__title">{t('notFound.title')}</h2>
        <p className="not-found-page__message">
          {t('notFound.message')}
        </p>
        <button className="not-found-page__button" onClick={handleGoHome}>
          {getHomePath() === '/dashboard' ? t('notFound.goHome') : t('notFound.goBack')}
        </button>
      </div>
    </div>
  );
};
