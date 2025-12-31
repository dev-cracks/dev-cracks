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

  // Reproducir audio automáticamente al cargar la página (sin necesidad de interacción)
  useEffect(() => {
    // Buscar el elemento audio en el HTML
    const audioElement = document.getElementById('thunder-audio') as HTMLAudioElement;
    
    if (!audioElement) {
      console.error('Audio element not found in HTML');
      return;
    }
    
    audioRef.current = audioElement;
    
    // Asegurar que el volumen esté correcto
    audioElement.volume = 0.5;
    
    // Función para intentar reproducir
    const tryPlay = async () => {
      try {
        // Si ya está reproduciendo, verificar que no esté muted
        if (!audioElement.paused && !audioElement.ended) {
          if (audioElement.muted) {
            audioElement.muted = false;
            console.log('Audio was muted, unmuting now');
          }
          return;
        }
        
        // Si está muted, intentar reproducir con muted y luego desmutear
        if (audioElement.muted) {
          await audioElement.play();
          console.log('Audio playing with muted');
          setTimeout(() => {
            audioElement.muted = false;
            console.log('Audio unmuted, volume:', audioElement.volume);
          }, 100);
        } else {
          // Intentar reproducir sin muted
          await audioElement.play();
          console.log('Audio playing automatically');
        }
      } catch (error: any) {
        console.log('Audio play attempt failed:', error);
        // Si falla, intentar con muted
        try {
          audioElement.muted = true;
          await audioElement.play();
          console.log('Audio playing with muted workaround');
          setTimeout(() => {
            audioElement.muted = false;
            console.log('Audio unmuted after workaround');
          }, 100);
        } catch (mutedError) {
          console.log('Audio play failed even with muted:', mutedError);
        }
      }
    };
    
    // Verificar estado de reproducción
    audioElement.addEventListener('playing', () => {
      console.log('Audio is playing');
      console.log('Audio volume:', audioElement.volume);
      console.log('Audio muted:', audioElement.muted);
      // Asegurar que no esté muted cuando esté reproduciendo
      if (audioElement.muted) {
        setTimeout(() => {
          audioElement.muted = false;
        }, 50);
      }
    });
    
    audioElement.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      if (audioElement.error) {
        console.error('Audio error code:', audioElement.error.code);
        console.error('Audio error message:', audioElement.error.message);
      }
    });
    
    // Intentar reproducir en múltiples momentos
    const timers: NodeJS.Timeout[] = [];
    
    // Intentar inmediatamente si ya está listo
    if (audioElement.readyState >= 2) {
      tryPlay();
    }
    
    // Intentar cuando pueda reproducir
    audioElement.addEventListener('canplay', () => {
      console.log('Audio can play');
      tryPlay();
    }, { once: true });
    
    // Intentar cuando esté completamente listo
    audioElement.addEventListener('canplaythrough', () => {
      console.log('Audio can play through');
      tryPlay();
    }, { once: true });
    
    // Intentar después de varios delays
    [100, 200, 300, 500, 1000].forEach((delay) => {
      const timer = setTimeout(() => {
        if (audioElement.paused) {
          tryPlay();
        }
      }, delay);
      timers.push(timer);
    });
    
    return () => {
      timers.forEach(timer => clearTimeout(timer));
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  // Reproducir audio cuando el usuario hace click (si no se ha reproducido)
  const playAudioOnClick = useRef(false);
  
  const playAudioOnInteraction = () => {
    if (playAudioOnClick.current) return; // Ya se intentó reproducir
    
    if (audioRef.current) {
      const audio = audioRef.current;
      // Intentar reproducir siempre que esté pausado o haya terminado
      if (audio.paused || audio.ended) {
        audio.currentTime = 0; // Reiniciar desde el principio
        audio.play().then(() => {
          console.log('Audio playing on interaction');
          playAudioOnClick.current = true;
        }).catch(error => {
          console.log('Audio play on interaction failed:', error);
        });
      }
    } else {
      // Si no hay audio cargado, intentar cargarlo y reproducirlo
      const audio = new Audio('/audio/thunder.mp3');
      audio.volume = 0.5;
      audioRef.current = audio;
      audio.play().then(() => {
        console.log('Audio playing on interaction (new instance)');
        playAudioOnClick.current = true;
      }).catch(error => {
        console.log('Audio play on interaction (new instance) failed:', error);
      });
    }
  };

  // Agregar listener global para cualquier interacción del usuario
  useEffect(() => {
    const handleUserInteraction = () => {
      playAudioOnInteraction();
    };

    // Agregar listeners para diferentes tipos de interacción (solo una vez)
    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('mousedown', handleUserInteraction, { once: true });
    document.addEventListener('touchstart', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('mousedown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
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
    
    // Intentar reproducir audio si no se ha reproducido
    playAudioOnInteraction();
    
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
            <div
              style={{
                height: '480px',
                width: '480px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0 0 20px rgba(177, 158, 239, 0.5))',
                transition: 'filter 0.3s ease'
              }}
            >
              <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                <defs>
                  <linearGradient id="crackGradientWeb" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF0080" />
                    <stop offset="100%" stopColor="#7928CA" />
                  </linearGradient>
                  <filter id="glowWeb" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" />
                  </filter>
                </defs>
                <g transform="translate(106, 120)">
                  <path d="M60 40 L10 100 L60 160" stroke="url(#crackGradientWeb)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M240 40 L290 100 L240 160" stroke="url(#crackGradientWeb)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" filter="url(#glowWeb)" />
                  <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x="256" y="400" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="58" fill="white" letterSpacing="-2">
                  DEV<tspan fill="url(#crackGradientWeb)">CRACKS</tspan>
                </text>
                <text x="256" y="440" textAnchor="middle" fontFamily="Courier New, monospace" fontWeight="bold" fontSize="20" fill="#888" letterSpacing="5">
                  CODE // BREAKER
                </text>
              </svg>
            </div>
          </div>
        </AnimatedContent>
      )}
    </div>
  );
};

