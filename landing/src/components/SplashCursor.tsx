import React, { useEffect, useRef } from 'react';
import './SplashCursor.css';

type SplashCursorProps = {
  className?: string;
  style?: React.CSSProperties;
  color?: string;
  particleCount?: number;
  particleSize?: number;
  duration?: number;
};

export const SplashCursor: React.FC<SplashCursorProps> = ({
  className,
  style,
  color = '#B19EEF',
  particleCount = 15,
  particleSize = 4,
  duration = 1000
}) => {
  const containerRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
  }>>([]);
  const rafRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const isActiveRef = useRef(true); // Activar por defecto

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resize = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      container.width = rect.width * dpr;
      container.height = rect.height * dpr;
      const ctx = container.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const createParticles = (x: number, y: number) => {
      const newParticles: typeof particlesRef.current = [];
      const dpr = window.devicePixelRatio || 1;
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const speed = 2 + Math.random() * 3;
        newParticles.push({
          x: x / dpr,
          y: y / dpr,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: duration,
          maxLife: duration
        });
      }
      particlesRef.current.push(...newParticles);
    };

    const animate = () => {
      if (!container) return;

      const ctx = container.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, container.width / dpr, container.height / dpr);

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.life -= 16;

        if (particle.life > 0) {
          const alpha = particle.life / particle.maxLife;
          const size = particleSize * alpha;
          
          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        return particle.life > 0;
      });

      if (particlesRef.current.length > 0 || isActiveRef.current) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        rafRef.current = null;
      }
    };

    const startAnimation = () => {
      if (!rafRef.current) {
        isActiveRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // Iniciar el loop de animación inmediatamente
    startAnimation();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const x = (e.clientX - rect.left) * dpr;
      const y = (e.clientY - rect.top) * dpr;

      const dx = x - lastMouseRef.current.x;
      const dy = y - lastMouseRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 5) {
        createParticles(x, y);
        lastMouseRef.current = { x, y };
      }

      mouseRef.current = { x, y };
      isActiveRef.current = true;

      if (!rafRef.current) {
        startAnimation();
      }
    };

    const handleMouseLeave = () => {
      isActiveRef.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [color, particleCount, particleSize, duration]);

  return (
    <canvas
      ref={containerRef}
      className={`splash-cursor ${className ?? ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        ...style
      }}
    />
  );
};
