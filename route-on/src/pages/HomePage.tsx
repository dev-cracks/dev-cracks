import StaggeredMenu from '../components/StaggeredMenu';
import { FaRobot } from 'react-icons/fa';

// Logo placeholder - deberías reemplazar esto con tu logo real
const logoUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="110" height="24"%3E%3Ctext x="0" y="18" font-family="Arial" font-size="16" fill="%23fff"%3ERoute On%3C/text%3E%3C/svg%3E';

const menuItems = [
  { label: 'Inicio', ariaLabel: 'Ir a la página de inicio', link: '/' },
  { label: 'Recepción', ariaLabel: 'Gestionar recepción de paquetes', link: '/recepcion' },
  { label: 'Envíos', ariaLabel: 'Gestionar envíos de paquetes', link: '/envios' },
  { label: 'Distribución', ariaLabel: 'Gestionar distribución de paquetes', link: '/distribucion' },
  { label: 'Seguimiento', ariaLabel: 'Seguimiento de paquetes', link: '/seguimiento' },
  { label: 'Mapa', ariaLabel: 'Ver puntos en el mapa', link: '/mapa' },
  { label: 'Incidencias', ariaLabel: 'Gestionar incidencias de paquetes', link: '/incidencias' },
  { label: 'Rutas IA', ariaLabel: 'Organizar rutas con inteligencia artificial', link: '/rutas-ia' }
];

const socialItems = [
  { label: 'Twitter', link: 'https://twitter.com' },
  { label: 'GitHub', link: 'https://github.com' },
  { label: 'LinkedIn', link: 'https://linkedin.com' }
];

export const HomePage = () => {
  return (
    <div style={{ height: '100vh', background: '#1a1a1a', position: 'relative' }}>
      <StaggeredMenu
        position="right"
        items={menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#fff"
        openMenuButtonColor="#fff"
        changeMenuColorOnOpen={true}
        colors={['#B19EEF', '#5227FF']}
        logoUrl={logoUrl}
        accentColor="#ff6b6b"
        onMenuOpen={() => console.log('Menu opened')}
        onMenuClose={() => console.log('Menu closed')}
      />
      
      {/* Icono de Jarvis flotante */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        right: '2rem',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #5227FF 0%, #B19EEF 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(82, 39, 255, 0.4)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        zIndex: 30
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 6px 30px rgba(82, 39, 255, 0.6)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(82, 39, 255, 0.4)';
      }}
      >
        <FaRobot size={30} color="#fff" />
      </div>
    </div>
  );
};

