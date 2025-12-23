import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PillNav.css';

interface PillNavProps {
  className?: string;
}

export const PillNav: React.FC<PillNavProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/account', label: 'Account' },
    { path: '/support', label: 'Support' },
    { path: '/backoffice', label: 'Backoffice', external: true }
  ];

  const handleNavClick = (item: typeof menuItems[0], e: React.MouseEvent) => {
    e.preventDefault();
    if (item.external) {
      const backofficeUrl = import.meta.env.VITE_BACKOFFICE_URL || 
        `${window.location.origin}/backoffice`;
      window.open(backofficeUrl, '_blank');
    } else {
      navigate(item.path);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className={`pill-nav ${className}`}>
      <div className="pill-nav__container">
        <div className="pill-nav__logo" onClick={() => navigate('/portal')}>
          <div className="pill-nav__logo-svg">
            <svg width="600" height="120" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="crackGradientNav" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0080" />
                  <stop offset="100%" stopColor="#7928CA" />
                </linearGradient>
                <filter id="glowNav" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>
              <g transform="translate(20, 10) scale(0.5)">
                <path d="M60 40 L10 100 L60 160" stroke="url(#crackGradientNav)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M240 40 L290 100 L240 160" stroke="url(#crackGradientNav)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" filter="url(#glowNav)" />
                <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x="190" y="82" textAnchor="start" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="52" fill="white" letterSpacing="-2">
                DEV<tspan fill="url(#crackGradientNav)">CRACKS</tspan>
              </text>
            </svg>
          </div>
        </div>
        <div className="pill-nav__menu">
          {menuItems.map((item) => (
            <button
              key={item.path}
              className={`pill-nav__item ${isActive(item.path) ? 'pill-nav__item--active' : ''}`}
              onClick={(e) => handleNavClick(item, e)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

