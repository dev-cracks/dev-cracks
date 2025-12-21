import {
  Button,
  makeStyles,
  tokens,
  Menu,
  MenuTrigger,
  MenuPopover,
  MenuList,
  MenuItem,
  mergeClasses,
} from '@fluentui/react-components';
import {
  DocumentRegular,
  EyeRegular,
  QuestionCircleRegular,
} from '@fluentui/react-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSettings } from '../contexts/SettingsContext';
import { useRibbonMenu } from '../contexts/RibbonMenuContext';

const useStyles = makeStyles({
  ribbonMenu: {
    height: '60px', // Misma altura que el header del sidebar (Menú Principal)
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    gap: tokens.spacingHorizontalXS,
    margin: 0,
    width: '100%',
    boxSizing: 'border-box',
  },
  ribbonContent: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    flex: 1,
  },
  groupContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalXS,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    '&:last-child': {
      borderRight: 'none',
    },
  },
  menuButton: {
    height: '44px',
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    borderRadius: 0,
    borderBottom: '3px solid transparent',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
      borderBottomColor: tokens.colorNeutralStroke1,
    },
  },
  menuButtonActive: {
    backgroundColor: tokens.colorNeutralBackground2,
    borderBottomColor: '#0078d4',
    color: '#0078d4',
    fontWeight: tokens.fontWeightSemibold,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
      borderBottomColor: '#0078d4',
    },
  },
  fileMenu: {
    fontWeight: tokens.fontWeightSemibold,
  },
});

interface RibbonMenuProps {
  onMenuToggle?: () => void;
}

export const RibbonMenu = ({ onMenuToggle }: RibbonMenuProps) => {
  const styles = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const { openSettings } = useSettings();
  const { groups } = useRibbonMenu();

  // Menú base siempre disponible
  const menuItems = [
    {
      id: 'file',
      label: 'File',
      icon: <DocumentRegular />,
      items: [
        { label: 'New', action: () => console.log('New') },
        { label: 'Open', action: () => console.log('Open') },
        { label: 'Save', action: () => console.log('Save') },
        { label: 'Settings', action: () => openSettings() },
      ],
    },
    {
      id: 'view',
      label: 'View',
      icon: <EyeRegular />,
      items: [
        { label: 'Refresh', action: () => window.location.reload() },
        { label: 'Toggle Sidebar', action: () => onMenuToggle?.() },
      ],
    },
    {
      id: 'help',
      label: 'Help',
      icon: <QuestionCircleRegular />,
      items: [
        { label: 'Documentation', action: () => console.log('Docs') },
        { label: 'About', action: () => console.log('About') },
      ],
    },
  ];

  const isActive = (item: { id: string; label: string; items: Array<{ label: string; action: () => void }>; path?: string }) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    return false;
  };

  // Buscar los botones de crear en los grupos (clientes, sedes, tenants, usuarios)
  const createCustomerButton = groups
    .find((group) => group.id === 'customers')
    ?.items.find((item) => item.id === 'create');
  
  const createOfficeButton = groups
    .find((group) => group.id === 'offices')
    ?.items.find((item) => item.id === 'create');
  
  const createTenantButton = groups
    .find((group) => group.id === 'tenants')
    ?.items.find((item) => item.id === 'create');
  
  const createUserButton = groups
    .find((group) => group.id === 'users')
    ?.items.find((item) => item.id === 'create');

  // Filtrar los items de los grupos excluyendo los botones de crear
  const filteredGroups = groups.map((group) => {
    if (group.id === 'customers' || group.id === 'offices' || group.id === 'tenants' || group.id === 'users') {
      return {
        ...group,
        items: group.items.filter((item) => item.id !== 'create'),
      };
    }
    return group;
  });

  return (
    <div className={styles.ribbonMenu}>
      {/* Botones de crear al principio del ribbon (clientes, sedes, tenants, usuarios) */}
      {createCustomerButton && (
        <div style={{ marginRight: tokens.spacingHorizontalM }}>
          <Button
            appearance="primary"
            shape="square"
            size="large"
            icon={createCustomerButton.icon}
            onClick={createCustomerButton.action}
            disabled={createCustomerButton.disabled}
          >
            {createCustomerButton.label}
          </Button>
        </div>
      )}
      {createOfficeButton && (
        <div style={{ marginRight: tokens.spacingHorizontalM }}>
          <Button
            appearance="primary"
            shape="square"
            size="large"
            icon={createOfficeButton.icon}
            onClick={createOfficeButton.action}
            disabled={createOfficeButton.disabled}
          >
            {createOfficeButton.label}
          </Button>
        </div>
      )}
      {createTenantButton && (
        <div style={{ marginRight: tokens.spacingHorizontalM }}>
          <Button
            appearance="primary"
            shape="square"
            size="large"
            icon={createTenantButton.icon}
            onClick={createTenantButton.action}
            disabled={createTenantButton.disabled}
          >
            {createTenantButton.label}
          </Button>
        </div>
      )}
      {createUserButton && (
        <div style={{ marginRight: tokens.spacingHorizontalM }}>
          <Button
            appearance="primary"
            shape="square"
            size="large"
            icon={createUserButton.icon}
            onClick={createUserButton.action}
            disabled={createUserButton.disabled}
          >
            {createUserButton.label}
          </Button>
        </div>
      )}
      
      {/* Pestañas de menú */}
      {menuItems.map((item) => (
        <Menu key={item.id}>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="subtle"
              className={mergeClasses(
                styles.menuButton,
                isActive(item) && styles.menuButtonActive
              )}
            >
              {item.label}
            </Button>
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              {item.items.map((subItem: { label: string; action: () => void }, index: number) => (
                <MenuItem key={index} onClick={subItem.action}>
                  {subItem.label}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      ))}
      
      {/* Grupos dinámicos del contexto */}
      {filteredGroups.length > 0 && filteredGroups.some((group) => group.items.length > 0) && (
        <div className={styles.ribbonContent}>
          {filteredGroups
            .filter((group) => group.items.length > 0)
            .map((group) => (
              <div key={group.id} className={styles.groupContainer}>
                {group.items.map((item) => (
                  <Button
                    key={item.id}
                    appearance="subtle"
                    icon={item.icon}
                    onClick={item.action}
                    disabled={item.disabled}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

