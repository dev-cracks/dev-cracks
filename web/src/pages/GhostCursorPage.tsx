import React, { useState, useEffect, useRef } from 'react';
import GhostCursor from '../components/GhostCursor';
import { BlurText } from '../components/BlurText';
import { AnimatedContent } from '../components/AnimatedContent';
import './GhostCursorPage.css';

type PageState = 'text' | 'logo' | 'navigating';

export const GhostCursorPage = () => {
  const [ghostActive, setGhostActive] = useState(true);
  const [pageState, setPageState] = useState<PageState>('text');
  const [textVisible, setTextVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textTimerRef = useRef<NodeJS.Timeout | null>(null);
  const logoTimerRef = useRef<NodeJS.Timeout | null>(null);

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

  const text = "¿Le temes a la IA, Automatización y la transformación digital?";

  // Timer para ocultar texto después de 2 segundos (desde que termina la animación del texto)
  useEffect(() => {
    if (pageState === 'text') {
      // El texto aparece después de 1 segundo y dura ~3 segundos en total
      // Esperamos 2 segundos adicionales después de que termine la animación
      const textAnimationDuration = 1000 + (text.split(' ').length * 150) + 600; // delay + animación
      const waitTime = 2000; // 2 segundos adicionales
      
      textTimerRef.current = setTimeout(() => {
        handleTextComplete();
      }, textAnimationDuration + waitTime);
    }

    return () => {
      if (textTimerRef.current) {
        clearTimeout(textTimerRef.current);
      }
    };
  }, [pageState, text]);

  // Timer para navegar después de 2 segundos de mostrar el logo
  useEffect(() => {
    if (pageState === 'logo' && logoVisible) {
      logoTimerRef.current = setTimeout(() => {
        handleNavigate();
      }, 2000);
    }

    return () => {
      if (logoTimerRef.current) {
        clearTimeout(logoTimerRef.current);
      }
    };
  }, [pageState, logoVisible]);

  const handleTextComplete = () => {
    if (pageState !== 'text') return;
    
    setTextVisible(false);
    setTimeout(() => {
      setPageState('logo');
      setLogoVisible(true);
    }, 600); // Duración de la animación de salida
  };

  const handleNavigate = () => {
    if (pageState === 'navigating') return;
    
    setPageState('navigating');
    setGhostActive(false);
    
    setTimeout(() => {
      window.location.href = '/landing';
    }, 300);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (pageState === 'navigating') return;
    
    if (pageState === 'text') {
      // Si estamos en el estado de texto, ocultar texto y mostrar logo
      if (textTimerRef.current) {
        clearTimeout(textTimerRef.current);
      }
      handleTextComplete();
    } else if (pageState === 'logo') {
      // Si estamos en el estado de logo, navegar
      if (logoTimerRef.current) {
        clearTimeout(logoTimerRef.current);
      }
      handleNavigate();
    }
  };

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

      {/* Texto - aparece primero */}
      {textVisible && (
        <div 
          className="ghost-cursor-page__text-container" 
          style={{ 
            position: 'relative', 
            zIndex: 10, 
            pointerEvents: 'none',
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          <BlurText
            text={text}
            delay={1000}
            animateBy="words"
            direction="top"
            duration={600}
            className="text-2xl mb-8"
          />
        </div>
      )}

      {/* Logo - aparece desde abajo después del texto */}
      {logoVisible && (
        <AnimatedContent
          direction="bottom"
          duration={600}
          className="ghost-cursor-page__logo-container"
        >
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem'
            }}
          >
            <img 
              src="/dev-cracks-logo.jpg" 
              alt="Dev Cracks Logo" 
              style={{
                height: '120px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 20px rgba(177, 158, 239, 0.5))',
                transition: 'filter 0.3s ease'
              }}
            />
            <h1 
              style={{
                fontSize: '3rem',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '0.1em',
                textShadow: '0 0 20px rgba(177, 158, 239, 0.5)',
                margin: 0
              }}
            >
              DEV CRACKS
            </h1>
          </div>
        </AnimatedContent>
      )}
    </div>
  );
};

