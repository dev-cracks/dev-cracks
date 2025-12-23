import React, { useEffect, useRef } from 'react';
import './ShapeBlur.css';

interface ShapeBlurProps {
  children: React.ReactNode;
  intensity?: number;
  size?: number;
  color?: string;
  className?: string;
}

export const ShapeBlur: React.FC<ShapeBlurProps> = ({
  children,
  intensity = 1,
  size = 200,
  color = 'rgba(177, 158, 239, 0.6)',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const blurRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const blur = blurRef.current;
    if (!container || !blur) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      blur.style.left = `${x}px`;
      blur.style.top = `${y}px`;
    };

    const handleMouseEnter = () => {
      blur.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      blur.style.opacity = '0';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`shape-blur ${className}`}>
      <div className="shape-blur__content">{children}</div>
      <div
        ref={blurRef}
        className="shape-blur__blur"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          filter: `blur(${20 * intensity}px)`,
          opacity: 0,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </div>
  );
};

