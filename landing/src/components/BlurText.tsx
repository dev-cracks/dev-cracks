import React, { useEffect, useState, useRef } from 'react';
import './BlurText.css';

interface BlurTextProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0,
  duration = 2000,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [blurAmount, setBlurAmount] = useState(30);
  const [opacity, setOpacity] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setOpacity(1);
      
      // Animación de blur y opacity
      const startTime = Date.now();
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function para suavizar la animación (ease-out cubic)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        // Reducir blur de 30px a 0px
        setBlurAmount(30 * (1 - easeOut));
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          setBlurAmount(0);
        }
      };
      
      animationRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [delay, duration]);

  return (
    <div className={`blur-text ${className}`}>
      <span
        className="blur-text__content"
        style={{
          filter: `blur(${blurAmount}px)`,
          opacity: opacity,
          willChange: 'filter, opacity'
        }}
      >
        {text}
      </span>
    </div>
  );
};

