import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';
import './GhostCursorPage.css';

export const GhostCursorPage = () => {
  const navigate = useNavigate();
  const [ghostActive, setGhostActive] = useState(true);

  const handleLogoClick = () => {
    setGhostActive(false);
    setTimeout(() => {
      navigate('/dashboard');
    }, 300);
  };

  return (
    <div 
      className={`ghost-cursor-page ${ghostActive ? 'ghost-cursor-page--active' : 'ghost-cursor-page--inactive'}`}
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'relative',
        backgroundColor: 'rgb(6, 0, 16)',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {ghostActive && (
        <LiquidEther
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      )}
      
      <div 
        className="ghost-cursor-page__logo-container"
        onClick={handleLogoClick}
      >
        <img 
          src="/dev-cracks-logo.jpg" 
          alt="Dev Cracks Logo" 
          className="ghost-cursor-page__logo"
        />
        <h1 className="ghost-cursor-page__title">DEV CRACKS</h1>
      </div>
    </div>
  );
};

