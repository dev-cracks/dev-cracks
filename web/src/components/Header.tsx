import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserMenu } from './UserMenu';

const navigation = [
  { href: '#inicio', label: 'Inicio', id: 'inicio' },
  { href: '#servicios', label: 'Servicios', id: 'servicios' },
  { href: '#productos', label: 'Productos', id: 'productos' },
  { href: '#casos-uso', label: 'Casos de Uso', id: 'casos-uso' },
  { href: '#nosotros', label: 'Por Qué Elegirnos', id: 'nosotros' },
  { href: '#contacto', label: 'Contacto', id: 'contacto' }
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoading, isAuthenticated, login, logout } = useAuth();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    
    // Close mobile menu on click
    setIsMenuOpen(false);
    
    // If we're on the services page, navigate to home first
    if (location.pathname !== '/') {
      navigate('/');
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
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => setIsMenuOpen(false)}>
          <img src="/dev-cracks-logo.jpg" alt="Logo de Dev Cracks" />
          <h1>DEV CRACKS</h1>
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
            <li className="header__auth">
              {!isLoading && (
                isAuthenticated ? (
                  <UserMenu />
                ) : (
                  <button 
                    className="header__auth-button header__auth-button--login"
                    onClick={() => login()}
                    aria-label="Login"
                  >
                    Login
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

