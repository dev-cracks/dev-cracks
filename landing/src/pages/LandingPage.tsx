import React from 'react';
import { ShapeBlur } from '../components/ShapeBlur';
import { BlurText } from '../components/BlurText';
import './LandingPage.css';

export const LandingPage = () => {
  return (
    <div 
      className="landing-page"
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
      <div className="landing-page__logo-container">
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

