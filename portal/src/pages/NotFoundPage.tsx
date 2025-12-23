import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GridScan } from '../components/GridScan';
import './NotFoundPage.css';

namespace NotFoundPage {
  export const Component = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
      navigate('/dashboard');
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
          <h2 className="not-found-page__title">Página no encontrada</h2>
          <p className="not-found-page__message">
            La página que buscas no existe o ha sido movida.
          </p>
          <button className="not-found-page__button" onClick={handleGoHome}>
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  };
}

export default NotFoundPage.Component;

