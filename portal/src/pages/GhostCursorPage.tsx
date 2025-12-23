import React from 'react';
import GhostCursor from '../components/GhostCursor';

export const GhostCursorPage = () => {
  return (
    <div 
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'relative',
        backgroundColor: 'rgb(6, 0, 16)',
        margin: 0,
        padding: 0,
        overflow: 'hidden'
      }}
    >
      <div style={{ height: 600, position: 'relative' }}>
        <GhostCursor
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
      </div>
    </div>
  );
};

