import { useTranslation } from 'react-i18next';
import StaggeredMenu from '../components/StaggeredMenu.js';
import FloatingIcon from '../components/FloatingIcon.js';
import Dock from '../components/Dock.js';
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';

// Logo placeholder - deberías reemplazar esto con tu logo real
const logoUrl = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="110" height="24"%3E%3Ctext x="0" y="18" font-family="Arial" font-size="16" fill="%23fff"%3ERoute On%3C/text%3E%3C/svg%3E';

export const HomePage = () => {
  const { t } = useTranslation('route-on');

  const menuItems = [
    { label: t('navigation.home'), ariaLabel: t('navigation.homeAria'), link: '/' },
    { label: t('navigation.reception'), ariaLabel: t('navigation.receptionAria'), link: '/recepcion' },
    { label: t('navigation.shipments'), ariaLabel: t('navigation.shipmentsAria'), link: '/envios' },
    { label: t('navigation.distribution'), ariaLabel: t('navigation.distributionAria'), link: '/distribucion' },
    { label: t('navigation.tracking'), ariaLabel: t('navigation.trackingAria'), link: '/seguimiento' },
    { label: t('navigation.map'), ariaLabel: t('navigation.mapAria'), link: '/mapa' },
    { label: t('navigation.incidents'), ariaLabel: t('navigation.incidentsAria'), link: '/incidencias' },
    { label: t('navigation.aiRoutes'), ariaLabel: t('navigation.aiRoutesAria'), link: '/rutas-ia' }
  ];

  const socialItems = [
    { label: 'Twitter', link: 'https://twitter.com' },
    { label: 'GitHub', link: 'https://github.com' },
    { label: 'LinkedIn', link: 'https://linkedin.com' }
  ];

  const dockItems = [
    { icon: <VscHome size={18} />, label: t('dock.home'), onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: t('dock.archive'), onClick: () => alert('Archive!') },
    { icon: <VscAccount size={18} />, label: t('dock.profile'), onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: t('dock.settings'), onClick: () => alert('Settings!') },
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

