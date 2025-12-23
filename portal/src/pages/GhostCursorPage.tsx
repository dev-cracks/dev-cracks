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

  const handleNavClick = (path: string, external: boolean = false) => {
    if (external) {
      window.location.href = path;
    } else {
      setGhostActive(false);
      setTimeout(() => {
        window.location.href = path;
      }, 300);
    }
  };

  // Iconos SVG en blanco limpio
  const BackofficeIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
    </svg>
  );

  const PortalIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    </svg>
  );

  const LandingIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
    </svg>
  );

  const DevCoachIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
    </svg>
  );

  const RouteOnIcon = () => (
    <svg stroke="#ffffff" fill="#ffffff" strokeWidth="0" viewBox="0 0 24 24" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
    </svg>
  );

  const navItems = [
    { path: '/backoffice', label: 'Backoffice', icon: <BackofficeIcon /> },
    { path: '/portal', label: 'Portal', icon: <PortalIcon /> },
    { path: '/landing', label: 'Landing', icon: <LandingIcon /> },
    { path: 'https://dev-coach.dev-cracks.com', label: 'Dev Coach', icon: <DevCoachIcon />, external: true },
    { path: 'https://route-on.dev-cracks.com', label: 'Route On', icon: <RouteOnIcon />, external: true }
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
            <img 
              src="/dev-cracks-logo.jpg" 
              alt="Dev Cracks Logo" 
              className="ghost-cursor-page__logo"
            />
            <h1 className="ghost-cursor-page__title">DEV CRACKS</h1>
          </div>

          <div className="ghost-cursor-page__fractalize-logo">
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
              onClick={() => handleNavClick(item.path, item.external)}
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

