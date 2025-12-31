import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GridScan } from './GridScan';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation('common');

  // Valores por defecto en inglés
  const defaultTranslations = {
    title: 'Page not found',
    message: 'The page you are looking for does not exist or has been moved.',
    goHome: 'Go to Dashboard',
    goBack: 'Go Back'
  };

  // Función helper para obtener traducciones con fallback
  const getTranslation = (key: string, defaultValue: string): string => {
    try {
      const translation = t(key, { defaultValue, returnObjects: false });
      // Si la traducción devuelve la clave (no encontrada) o es undefined/null, usar el valor por defecto
      if (!translation || translation === key || translation.startsWith('notFound.')) {
        return defaultValue;
      }
      return translation;
    } catch (error) {
      // Si hay algún error, devolver el valor por defecto
      return defaultValue;
    }
  };

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

  const title = getTranslation('notFound.title', defaultTranslations.title);
  const message = getTranslation('notFound.message', defaultTranslations.message);
  const buttonText = getHomePath() === '/dashboard' 
    ? getTranslation('notFound.goHome', defaultTranslations.goHome)
    : getTranslation('notFound.goBack', defaultTranslations.goBack);

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
        <h2 className="not-found-page__title">{title}</h2>
        <p className="not-found-page__message">
          {message}
        </p>
        <button className="not-found-page__button" onClick={handleGoHome}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};
