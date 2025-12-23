import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GhostCursor from '../components/GhostCursor';
import { ShapeBlur } from '../components/ShapeBlur';
import { BlurText } from '../components/BlurText';
import './LandingPage.css';

export const LandingPage = () => {
  const navigate = useNavigate();
  const [ghostActive, setGhostActive] = useState(true);

  const handleLogoClick = () => {
    setGhostActive(false);
    // Pequeño delay para que se vea la transición
    setTimeout(() => {
      window.location.href = '/landing';
    }, 300);
  };

  return (
    <div 
      className={`landing-page ${ghostActive ? 'landing-page--ghost-active' : 'landing-page--ghost-inactive'}`}
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'relative',
        backgroundColor: 'rgb(6, 0, 16)',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem'
      }}
    >
      {ghostActive && (
        <GhostCursor
          style={{ height: '100vh', width: '100vw' }}
          // Visuals
          color="#B19EEF"
          brightness={1}
          edgeIntensity={0}

          // Trail and motion
          trailLength={50}
          inertia={0.5}

          // Post-processing
          grainIntensity={0.05}
          bloomStrength={0.1}
          bloomRadius={1.0}
          bloomThreshold={0.025}

          // Fade-out behavior
          fadeDelayMs={1000}
          fadeDurationMs={1500}
        />
      )}
      
      <div 
        className="landing-page__logo-container"
        onClick={handleLogoClick}
      >
        <ShapeBlur
          intensity={1.5}
          size={300}
          color="rgba(177, 158, 239, 0.8)"
        >
          <img 
            src="/dev-cracks-logo.jpg" 
            alt="Dev Cracks Logo" 
            className="landing-page__logo"
          />
        </ShapeBlur>
        <h1 className="landing-page__title">DEV CRACKS</h1>
      </div>

      <div className="landing-page__text-container">
        <BlurText
          text="¿Le temes a la IA, Automatización y la transformación digital?"
          delay={1000}
          animateBy="words"
          direction="top"
          duration={600}
          className="text-2xl mb-8"
        />
      </div>
    </div>
  );
};

