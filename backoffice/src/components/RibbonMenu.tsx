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

const useStyles = makeStyles({
  ribbonMenu: {
    height: '44px',
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${tokens.colorNeutralStroke1}`,
    paddingLeft: tokens.spacingHorizontalM,
    paddingRight: tokens.spacingHorizontalM,
    gap: tokens.spacingHorizontalXS,
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

  const isActive = (item: typeof menuItems[0]) => {
    if (item.path) {
      return location.pathname === item.path;
    }
    return false;
  };

  return (
    <div className={styles.ribbonMenu}>
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
              {item.items.map((subItem, index) => (
                <MenuItem key={index} onClick={subItem.action}>
                  {subItem.label}
                </MenuItem>
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      ))}
    </div>
  );
};

