const navigation = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#contacto', label: 'Contacto' }
];

export const Header = () => (
  <header className="header">
    <div className="container header__inner">
      <div className="logo">
        <img src="/dev-cracks-logo.jpg" alt="Logo de Dev Cracks" />
        <h1>DEV CRACKS</h1>
      </div>
      <nav aria-label="Navegación principal">
        <ul>
          {navigation.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  </header>
);

