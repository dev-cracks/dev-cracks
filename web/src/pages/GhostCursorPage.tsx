import React, { useState } from 'react';
import GhostCursor from '../components/GhostCursor';
import './GhostCursorPage.css';

export const GhostCursorPage = () => {
  const [ghostActive, setGhostActive] = useState(true);

  const handleClick = () => {
    setGhostActive(false);
    setTimeout(() => {
      window.location.href = '/landing';
    }, 300);
  };

  return (
    <div 
      className={`ghost-cursor-page ${ghostActive ? 'ghost-cursor-page--active' : 'ghost-cursor-page--inactive'}`}
      onClick={handleClick}
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'relative',
        backgroundColor: 'rgb(6, 0, 16)',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer'
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
    </div>
  );
};

