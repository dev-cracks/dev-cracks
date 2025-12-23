import React, { useEffect, useState, useRef } from 'react';
import './BlurText.css';

type AnimateBy = 'words' | 'chars' | 'lines';
type Direction = 'top' | 'bottom' | 'left' | 'right';

interface BlurTextProps {
  text: string;
  delay?: number;
  duration?: number;
  animateBy?: AnimateBy;
  direction?: Direction;
  onAnimationComplete?: () => void;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0,
  duration = 600,
  animateBy = 'words',
  direction = 'top',
  onAnimationComplete,
  className = ''
}) => {
  const [wordStates, setWordStates] = useState<Array<{
    blur: number;
    opacity: number;
    translateX: number;
    translateY: number;
  }>>([]);
  
  const words = text.split(' ');
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useEffect(() => {
    // Inicializar estados de palabras
    const initialStates = words.map(() => ({
      blur: 20,
      opacity: 0,
      translateX: direction === 'left' ? -30 : direction === 'right' ? 30 : 0,
      translateY: direction === 'top' ? -30 : direction === 'bottom' ? 30 : 0
    }));
    setWordStates(initialStates);

    const startAnimation = () => {
      startTimeRef.current = Date.now();
      
      const animate = () => {
        if (!startTimeRef.current) return;
        
        const elapsed = Date.now() - startTimeRef.current;
        const wordDelay = 150; // Delay entre palabras
        const totalDuration = delay + (words.length * wordDelay) + duration;
        
        setWordStates(prev => {
          const newStates = [...prev];
          let allComplete = true;
          
          words.forEach((_, index) => {
            const wordStartTime = delay + (index * wordDelay);
            const wordElapsed = elapsed - wordStartTime;
            
            if (wordElapsed >= 0) {
              const progress = Math.min(wordElapsed / duration, 1);
              const easeOut = 1 - Math.pow(1 - progress, 3);
              
              // Asegurar que cuando progress === 1, blur sea exactamente 0
              const finalBlur = progress >= 1 ? 0 : 20 * (1 - easeOut);
              const finalOpacity = progress >= 1 ? 1 : easeOut;
              const finalTranslateX = progress >= 1 ? 0 : (direction === 'left' ? -30 : direction === 'right' ? 30 : 0) * (1 - easeOut);
              const finalTranslateY = progress >= 1 ? 0 : (direction === 'top' ? -30 : direction === 'bottom' ? 30 : 0) * (1 - easeOut);
              
              newStates[index] = {
                blur: finalBlur,
                opacity: finalOpacity,
                translateX: finalTranslateX,
                translateY: finalTranslateY
              };
              
              if (progress < 1) {
                allComplete = false;
              }
            } else {
              allComplete = false;
            }
          });
          
          if (allComplete && !completedRef.current && onAnimationComplete) {
            completedRef.current = true;
            setTimeout(() => {
              onAnimationComplete();
            }, 0);
          }
          
          return newStates;
        });
        
        if (elapsed < totalDuration) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          // Asegurar que todas las palabras tengan blur = 0 al finalizar
          setWordStates(prev => {
            const wordDelayFinal = 150;
            return prev.map((state, index) => {
              const wordStartTime = delay + (index * wordDelayFinal);
              const wordElapsed = totalDuration - wordStartTime;
              const shouldBeComplete = wordElapsed >= duration;
              
              return shouldBeComplete ? {
                blur: 0,
                opacity: 1,
                translateX: 0,
                translateY: 0
              } : state;
            });
          });
          
          if (onAnimationComplete && !completedRef.current) {
            completedRef.current = true;
            setTimeout(() => {
              onAnimationComplete();
            }, 0);
          }
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const timer = setTimeout(startAnimation, 0);
    
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text, delay, duration, direction, words.length, onAnimationComplete]);

  return (
    <div className={`blur-text ${className}`}>
      <span className="blur-text__content">
        {words.map((word, index) => (
          <span
            key={index}
            className="blur-text__word"
            style={{
              filter: wordStates[index] ? `blur(${wordStates[index].blur}px)` : 'blur(20px)',
              opacity: wordStates[index]?.opacity ?? 0,
              transform: `translate(${wordStates[index]?.translateX ?? 0}px, ${wordStates[index]?.translateY ?? 0}px)`,
              willChange: 'filter, opacity, transform',
              display: 'inline-block',
              marginRight: index < words.length - 1 ? '0.3em' : '0'
            }}
          >
            {word}
          </span>
        ))}
      </span>
    </div>
  );
};
