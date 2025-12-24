import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LiquidEther from '../components/LiquidEther';
import './GhostCursorPage.css';

export const GhostCursorPage = () => {
  const navigate = useNavigate();
  const [ghostActive, setGhostActive] = useState(true);

  const handleLogoClick = () => {
    setGhostActive(false);
    setTimeout(() => {
      navigate('/dashboard');
    }, 300);
  };

  const handleFractalizeClick = () => {
    setGhostActive(false);
    setTimeout(() => {
      window.location.href = '/fractalize';
    }, 300);
  };

  const handleNavClick = (path: string, external: boolean = false, absolute: boolean = false) => {
    if (external || absolute) {
      // Para rutas externas o absolutas, usar window.location.href
      window.location.href = path;
    } else {
      // Si es dashboard, usar el mismo comportamiento que el logo
      if (path === '/dashboard') {
        handleLogoClick();
      } else {
        // Navegar directamente sin delay para otras rutas internas del portal
        navigate(path);
      }
    }
  };

  // Iconos SVG en blanco limpio
  const DashboardIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" strokeWidth="0"></path>
    </svg>
  );

  const BackofficeIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" strokeWidth="0"></path>
    </svg>
  );

  const DevCoachIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" strokeWidth="0"></path>
    </svg>
  );

  const RouteOnIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" strokeWidth="0"></path>
    </svg>
  );

  const FractalizeIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M2 17L12 22L22 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
      <path d="M2 12L12 17L22 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );

  const LandingIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" strokeWidth="0"></path>
    </svg>
  );

  const DevPoolIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="2" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" strokeWidth="0"></path>
    </svg>
  );

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { path: '/backoffice', label: 'Backoffice', icon: <BackofficeIcon />, absolute: true },
    { path: '/dev-coach', label: 'Dev-coach', icon: <DevCoachIcon />, absolute: true },
    { path: '/dev-pool', label: 'Dev-pool', icon: <DevPoolIcon />, absolute: true },
    { path: '/route-on', label: 'Route-On', icon: <RouteOnIcon />, absolute: true },
    { path: '/fractalize', label: 'Fractalize', icon: <FractalizeIcon />, absolute: true },
    { path: '/landing', label: 'Landing', icon: <LandingIcon />, absolute: true }
  ];

  return (
    <div 
      className={`ghost-cursor-page ${ghostActive ? 'ghost-cursor-page--active' : 'ghost-cursor-page--inactive'}`}
      style={{ 
        height: '100vh', 
        width: '100vw',
        position: 'relative',
        backgroundColor: 'rgb(6, 0, 16)',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {ghostActive && (
        <LiquidEther
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      )}
      
      <div className="ghost-cursor-page__content">
        <div className="ghost-cursor-page__logos-wrapper">
          <div 
            className="ghost-cursor-page__logo-container"
            onClick={handleLogoClick}
          >
            <div className="ghost-cursor-page__logo">
              <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="crackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF0080" />
                    <stop offset="100%" stopColor="#7928CA" />
                  </linearGradient>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="5" />
                  </filter>
                </defs>
                <g transform="translate(106, 120)">
                  <path d="M60 40 L10 100 L60 160" stroke="url(#crackGradient)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M240 40 L290 100 L240 160" stroke="url(#crackGradient)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
                  <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x="256" y="400" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="58" fill="white" letterSpacing="-2">
                  DEV<tspan fill="url(#crackGradient)">CRACKS</tspan>
                </text>
                <text x="256" y="440" textAnchor="middle" fontFamily="Courier New, monospace" fontWeight="bold" fontSize="20" fill="#888" letterSpacing="5">
                  CODE // BREAKER
                </text>
              </svg>
            </div>
          </div>

          <div 
            className="ghost-cursor-page__fractalize-logo"
            onClick={handleFractalizeClick}
            style={{ cursor: 'pointer' }}
          >
            <svg width="512" height="512" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="fractalGradient" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="50%" stopColor="#2979FF" />
                  <stop offset="100%" stopColor="#D500F9" />
                </linearGradient>
                <linearGradient id="textGradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#00E5FF" />
                  <stop offset="100%" stopColor="#D500F9" />
                </linearGradient>
              </defs>
              <g transform="translate(130, 80) scale(1.2)">
                <path d="M0 0 L100 0 L50 50 Z" fill="url(#fractalGradient)" opacity="0.9"/>
                <path d="M0 0 L50 50 L0 100 Z" fill="url(#fractalGradient)" opacity="0.8"/>
                <path d="M50 50 L100 0 L100 100 Z" fill="url(#fractalGradient)" opacity="0.6"/>
                <path d="M0 100 L100 100 L50 150 Z" fill="url(#fractalGradient)" opacity="0.9"/>
                <path d="M0 100 L50 150 L0 200 Z" fill="url(#fractalGradient)" opacity="0.7"/>
                <path d="M50 150 L100 100 L100 200 Z" fill="url(#fractalGradient)" opacity="0.5"/>
                <path d="M100 0 L200 0 L150 50 Z" fill="url(#fractalGradient)" opacity="0.85"/>
                <path d="M100 0 L150 50 L100 50 Z" fill="url(#fractalGradient)" opacity="0.6"/>
                <path d="M100 100 L180 100 L140 140 Z" fill="url(#fractalGradient)" opacity="0.8"/>
                <path d="M100 100 L140 140 L100 150 Z" fill="url(#fractalGradient)" opacity="0.6"/>
                <circle cx="50" cy="50" r="3" fill="white" opacity="0.6"/>
                <circle cx="100" cy="100" r="3" fill="white" opacity="0.6"/>
                <circle cx="150" cy="50" r="3" fill="white" opacity="0.6"/>
                <circle cx="50" cy="150" r="3" fill="white" opacity="0.6"/>
              </g>
              <text x="256" y="420" textAnchor="middle" fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="800" fontSize="64" fill="url(#textGradient)" letterSpacing="4">
                FRACTALIZE
              </text>
              <text x="256" y="460" textAnchor="middle" fontFamily="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontWeight="400" fontSize="24" fill="#666" letterSpacing="2">
                MODULAR SOFTWARE SOLUTIONS
              </text>
            </svg>
          </div>
        </div>

        <nav className="ghost-cursor-page__nav">
          {navItems.map((item) => (
            <button
              key={item.path}
              className="ghost-cursor-page__nav-item"
              onClick={() => handleNavClick(item.path, item.external || false, item.absolute || false)}
              title={item.label}
            >
              <span className="ghost-cursor-page__nav-icon">{item.icon}</span>
              <span className="ghost-cursor-page__nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

