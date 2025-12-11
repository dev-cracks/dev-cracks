import { Link, useLocation, useNavigate } from 'react-router-dom';

const navigation = [
  { href: '#inicio', label: 'Inicio', id: 'inicio' },
  { href: '#servicios', label: 'Servicios', id: 'servicios' },
  { href: '#nosotros', label: 'Nosotros', id: 'nosotros' },
  { href: '#contacto', label: 'Contacto', id: 'contacto' }
];

export const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    
    // Si estamos en la página de servicios, navegar a home primero
    if (location.pathname !== '/') {
      navigate('/');
      // Esperar a que la navegación se complete antes de hacer scroll
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Si ya estamos en home, hacer scroll directamente
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src="/dev-cracks-logo.jpg" alt="Logo de Dev Cracks" />
          <h1>DEV CRACKS</h1>
        </Link>
        <nav aria-label="Navegación principal">
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={(e) => handleNavClick(e, item.href, item.id)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

