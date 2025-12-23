import React, { useState, useEffect, useRef } from 'react';
import GhostCursor from '../components/GhostCursor';
import { BlurText } from '../components/BlurText';
import './GhostCursorPage.css';

export const GhostCursorPage = () => {
  const [ghostActive, setGhostActive] = useState(true);
  const [clicked, setClicked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reproducir audio al cargar la página
  useEffect(() => {
    const audio = new Audio('/audio/thunder.mp3');
    audio.volume = 0.5; // Volumen al 50%
    audioRef.current = audio;
    
    // Intentar reproducir (puede fallar si el usuario no ha interactuado)
    const playAudio = async () => {
      try {
        await audio.play();
      } catch (error) {
        // Si falla, esperar a que el usuario interactúe
        console.log('Audio play failed, waiting for user interaction');
      }
    };
    
    playAudio();
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (clicked) return; // Prevenir múltiples clicks
    
    setClicked(true);
    setGhostActive(false);
    
    setTimeout(() => {
      window.location.href = '/landing';
    }, 300);
  };

  // También permitir click después de un tiempo si no se ha hecho click
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!clicked) {
        // Opcional: auto-navegar después de 3 segundos si no hay interacción
        // Comentado para que solo navegue con click
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [clicked]);

  return (
    <div 
      className={`ghost-cursor-page ${ghostActive ? 'ghost-cursor-page--active' : 'ghost-cursor-page--inactive'}`}
      onClick={handleClick}
      onMouseDown={handleClick}
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'relative',
        backgroundColor: 'rgb(6, 0, 16)',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        cursor: 'pointer',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem'
      }}
    >
      {ghostActive && (
        <GhostCursor
          style={{ height: '100vh', width: '100vw', pointerEvents: 'none' }}
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

      <div className="ghost-cursor-page__text-container" style={{ position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
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

