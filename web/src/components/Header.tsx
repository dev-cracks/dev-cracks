import { Link } from 'react-router-dom';

const navigation = [
  { href: '/#inicio', label: 'Inicio' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#nosotros', label: 'Nosotros' },
  { href: '/#contacto', label: 'Contacto' }
];

export const Header = () => (
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
              <Link to={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

