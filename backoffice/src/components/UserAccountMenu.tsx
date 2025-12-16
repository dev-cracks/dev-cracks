import {
  Avatar,
  makeStyles,
  tokens,
  Text,
  MenuPopover,
  Menu,
  MenuTrigger,
} from '@fluentui/react-components';
import {
  AddRegular,
} from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useSettings } from '../contexts/SettingsContext';

interface UserAccountMenuProps {
  trigger: React.ReactNode;
}

const useStyles = makeStyles({
  menuPopover: {
    padding: 0,
    minWidth: '340px',
    maxWidth: '400px',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  headerText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    fontWeight: tokens.fontWeightSemibold,
  },
  signOutLink: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  accountSection: {
    padding: tokens.spacingVerticalM,
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalM,
  },
  accountInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
  },
  accountAvatar: {
    flexShrink: 0,
  },
  accountDetails: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXS,
    flex: 1,
    minWidth: 0,
  },
  accountName: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  accountEmail: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  accountLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalS,
    marginTop: tokens.spacingVerticalM,
  },
  accountLink: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    textDecoration: 'none',
    cursor: 'pointer',
    padding: `${tokens.spacingVerticalXS} 0`,
    ':hover': {
      textDecoration: 'underline',
    },
  },
  otherAccountsSection: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  otherAccountsTitle: {
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground2,
    marginBottom: tokens.spacingVerticalS,
  },
  otherAccountItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  otherAccountAvatar: {
    flexShrink: 0,
  },
  otherAccountInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  },
  otherAccountName: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
  otherAccountEmail: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  moreButton: {
    minWidth: 'auto',
    padding: tokens.spacingHorizontalXS,
  },
  addAccountSection: {
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalM}`,
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  addAccountItem: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusSmall,
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  addAccountText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground1,
  },
});

export const UserAccountMenu = ({ trigger }: UserAccountMenuProps) => {
  const styles = useStyles();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { openSettings } = useSettings();

  if (!user) return null;

  const handleSignOut = () => {
    logout();
  };

  const handleViewAccount = () => {
    openSettings();
  };

  const handleSignInDifferent = () => {
    logout().then(() => {
      navigate('/login');
    });
  };

  // Extraer el dominio del email para mostrar "dev-cracks com"
  const getDomain = (email: string) => {
    const parts = email.split('@');
    if (parts.length > 1) {
      return parts[1].replace('.', ' ');
    }
    return 'dev-cracks com';
  };

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>{trigger}</MenuTrigger>
      <MenuPopover className={styles.menuPopover}>
        {/* Header con dominio y Sign out */}
        <div className={styles.header}>
          <Text className={styles.headerText}>{getDomain(user.email || 'dev-cracks.com')}</Text>
          <a className={styles.signOutLink} onClick={handleSignOut}>
            Sign out
          </a>
        </div>

        {/* Información de la cuenta principal */}
        <div className={styles.accountSection}>
          <div className={styles.accountInfo}>
            <Avatar
              className={styles.accountAvatar}
              name={user.name || user.email}
              image={user.picture}
              size={56}
            />
            <div className={styles.accountDetails}>
              <Text className={styles.accountName}>{user.name || 'Usuario'}</Text>
              <Text className={styles.accountEmail}>{user.email}</Text>
            </div>
          </div>
          <div className={styles.accountLinks}>
            <a className={styles.accountLink} onClick={handleViewAccount}>
              View account
            </a>
            <a className={styles.accountLink} onClick={() => console.log('Open another mailbox')}>
              Open another mailbox
            </a>
          </div>
        </div>

        {/* Otras cuentas (sección opcional) */}
        <div className={styles.otherAccountsSection}>
          <Text className={styles.otherAccountsTitle}>Other accounts</Text>
          {/* Aquí podrías agregar otras cuentas si las tienes */}
          {/* Por ahora dejamos un ejemplo estático o vacío */}
        </div>

        {/* Agregar otra cuenta */}
        <div className={styles.addAccountSection}>
          <div className={styles.addAccountItem} onClick={handleSignInDifferent}>
            <Avatar
              className={styles.otherAccountAvatar}
              icon={<AddRegular />}
              size={32}
              color="brand"
            />
            <Text className={styles.addAccountText}>Sign in with a different account</Text>
          </div>
        </div>
      </MenuPopover>
    </Menu>
  );
};

