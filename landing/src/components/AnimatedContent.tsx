import React, { useState, useEffect, useRef } from 'react';
import './AnimatedContent.css';

interface AnimatedContentProps {
  children: React.ReactNode;
  direction?: 'top' | 'bottom' | 'left' | 'right';
  duration?: number;
  className?: string;
}

export const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  direction = 'bottom',
  duration = 600,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pequeño delay para iniciar la animación
    const timer = setTimeout(() => {
      setIsAnimating(true);
      setIsVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  const getInitialTransform = () => {
    switch (direction) {
      case 'top':
        return 'translateY(-50px)';
      case 'bottom':
        return 'translateY(50px)';
      case 'left':
        return 'translateX(-50px)';
      case 'right':
        return 'translateX(50px)';
      default:
        return 'translateY(50px)';
    }
  };

  return (
    <div
      ref={contentRef}
      className={`animated-content ${className} ${isVisible ? 'animated-content--visible' : 'animated-content--hidden'}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getInitialTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms ease-out`,
        willChange: 'opacity, transform'
      }}
    >
      {children}
    </div>
  );
};

