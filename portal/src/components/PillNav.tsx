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
        <div className="pill-nav__logo" onClick={() => navigate('/dashboard')}>
          <img src="/dev-cracks-logo.jpg" alt="Dev Cracks Logo" />
          <span>DEV CRACKS</span>
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

