import StaggeredMenu from '../components/StaggeredMenu';
import FloatingIcon from '../components/FloatingIcon';
import Dock from '../components/Dock';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';

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
  const dockItems = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];

  return (
    <div style={{ width: '100%', height: '100vh', background: '#1a1a1a', position: 'relative', overflow: 'hidden' }}>
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
      
      <FloatingIcon />

      <Dock 
        items={dockItems}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />
    </div>
  );
};

