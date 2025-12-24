import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { UserMenu } from './UserMenu';
import { LanguageSelector } from './LanguageSelector';

export const Header = () => {
  const { t } = useTranslation('landing');
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();

  const navigation = [
    { href: '#inicio', label: t('navigation.home'), id: 'inicio' },
    { href: '#servicios', label: t('navigation.services'), id: 'servicios' },
    { href: '#productos', label: t('navigation.products'), id: 'productos' },
    { href: '#casos-uso', label: t('navigation.useCases'), id: 'casos-uso' },
    { href: '#nosotros', label: t('navigation.whyUs'), id: 'nosotros' },
    { href: '#contacto', label: t('navigation.contact'), id: 'contacto' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    
    // Close mobile menu on click
    setIsMenuOpen(false);
    
    // If we're on the services page, navigate to home first
    if (location.pathname !== '/home') {
      navigate('/home');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // If we're already on home, scroll directly
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/home" className="logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
          <div className="logo__svg">
            <svg width="600" height="120" viewBox="0 0 600 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="crackGradientHeader" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF0080" />
                  <stop offset="100%" stopColor="#7928CA" />
                </linearGradient>
                <filter id="glowHeader" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>
              <g transform="translate(20, 10) scale(0.5)">
                <path d="M60 40 L10 100 L60 160" stroke="url(#crackGradientHeader)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M240 40 L290 100 L240 160" stroke="url(#crackGradientHeader)" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" filter="url(#glowHeader)" />
                <path d="M180 10 L120 110 L170 110 L110 210" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <text x="190" y="82" textAnchor="start" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="52" fill="white" letterSpacing="-2">
                DEV<tspan fill="url(#crackGradientHeader)">CRACKS</tspan>
              </text>
            </svg>
          </div>
        </Link>
        <button 
          className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`header__nav ${isMenuOpen ? 'header__nav--open' : ''}`} aria-label="Main navigation">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => handleNavClick(e, item.href, item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="header__auth" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <LanguageSelector />
              {!isLoading && (
                isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <button 
                    className="header__auth-button header__auth-button--login"
                    onClick={() => login()}
                    aria-label={t('common.login')}
                  >
                    {t('common.login')}
                  </button>
                )
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

